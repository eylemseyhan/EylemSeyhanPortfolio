import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

// 🔐 Firebase init (serverless-safe)
const firebaseConfig = {
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
};
if (!getApps().length) {
    initializeApp(firebaseConfig);
}
const db = getFirestore();

// 🧠 Basit spam kontrolü
function checkForSpam({ name, email, message }) {
    const lowered = message.toLowerCase();
    return lowered.includes('http') || lowered.includes('buy now') || lowered.includes('free money');
}

// 📧 Mail gönderici fonksiyonu
async function sendEmail({ name, email, phone, message, ip }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_TO,
        subject: `Yeni iletişim formu mesajı - ${name}`,
        text: `
Yeni bir mesaj alındı!

Ad: ${name}
E-posta: ${email}
Telefon: ${phone || '-'}
IP: ${ip}

Mesaj:
${message}
        `,
        html: `
          <h2>Yeni İletişim Mesajı</h2>
          <p><strong>Ad:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || '-'}</p>
          <p><strong>IP:</strong> ${ip}</p>
          <p><strong>Mesaj:</strong><br>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { name, email, phone, message, botCheck } = req.body;
        // Honeypot 
        if (botCheck && botCheck !== '') {
            return res.status(400).json({ error: 'Bot olduğunuzdan şüphelenildi.' });
        }
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // --- Validation ---
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Ad, e-posta ve mesaj alanları zorunludur' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Geçersiz e-posta formatı.' });
        }

        if (phone) {
            const phoneRegex = /^[+]?[0-9()\s-]{10,15}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ error: 'Geçersiz telefon numarası formatı.' });
            }
        }

        if (checkForSpam({ name, email, message })) {
            return res.status(400).json({ error: 'Spam tespit edildi. Lütfen mesajınızı kontrol edin.' });
        }

        const messageData = {
            name,
            email,
            phone: phone || null,
            message,
            ip: clientIP,
            createdAt: new Date()
        };

        // --- Firestore'a kaydet
        await db.collection('messages').add({
            ...messageData,
            createdAt: FieldValue.serverTimestamp()
        });

        // --- Gmail'e gönder
        await sendEmail({...messageData });

        res.status(200).json({
            success: true,
            message: 'Mesajınız başarıyla gönderildi. En kısa sürede size döneceğim.'
        });
    } catch (error) {
        console.error('Sunucu hatası:', error.message);
        res.status(500).json({ error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
    }
}