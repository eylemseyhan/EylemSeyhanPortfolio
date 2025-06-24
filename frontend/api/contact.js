import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

const firebaseConfig = {
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
}

if (!getApps().length) {
    initializeApp(firebaseConfig)
}
const db = getFirestore()

function checkForSpam({ name, email, message }) {
    // Basit bir spam kontrolü örneği (geliştirebilirsin)
    return false
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end()

    try {
        const { name, email, phone, message } = req.body
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress

        // --- Validation ---
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Ad, e-posta ve mesaj alanları zorunludur' })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Geçersiz e-posta formatı.' })
        }
        if (phone) {
            const phoneRegex = /^[+]?[0-9()\\s-]{10,15}$/
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ error: 'Geçersiz telefon numarası formatı.' })
            }
        }

        // --- Spam Check ---
        if (checkForSpam({ name, email, message })) {
            return res.status(400).json({ error: 'Spam tespit edildi. Lütfen mesajınızı kontrol edin.' })
        }

        const messageData = {
            name,
            email,
            phone: phone || null,
            message,
            ip: clientIP,
            createdAt: new Date()
        }

        // --- Save to Firestore ---
        await db.collection('messages').add({
            ...messageData,
            createdAt: FieldValue.serverTimestamp()
        })

        // (E-posta gönderme fonksiyonunu eklemek istersen burada çağırabilirsin.)

        res.status(200).json({
            success: true,
            message: 'Mesajınız başarıyla gönderildi. En kısa sürede size döneceğim.'
        })
    } catch (error) {
        res.status(500).json({ error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' })
    }
}