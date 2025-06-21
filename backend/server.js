const express = require('express')
const cors = require('cors')
const admin = require('firebase-admin')
const Redis = require('redis')
const nodemailer = require('nodemailer')
const { RateLimiterRedis } = require('rate-limiter-flexible')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Firebase Admin SDK initialization
try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
        throw new Error('Firebase credentials not set in environment variables');
    }

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey
        })
    });
    console.log('Firebase Admin SDK initialized successfully.');

} catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error);
    // Değişkenler olmadan sunucunun çalışmasını engellemek için
    // uygulamayı başlatma kodunun geri kalanını atlayabilir veya çıkabiliriz.
    // Şimdilik sadece logluyoruz, ama bu sunucunun Firestore'a erişemeyeceği anlamına gelir.
}

const db = admin.firestore()

// Redis client setup
let redisClient = null
let rateLimiter = null

if (process.env.REDIS_URL) {
    redisClient = Redis.createClient({
        url: process.env.REDIS_URL
    })

    redisClient.on('error', (err) => console.log('Redis Client Error', err))
    redisClient.connect()

    // Rate limiter setup
    rateLimiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: 'contact_form',
        points: 3, // 3 requests
        duration: 60 * 15, // per 15 minutes
    })
} else {
    console.warn('Redis URL not found. Rate limiting will be disabled.')
}

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// Spam detection function
const checkForSpam = (data) => {
    const spamKeywords = [
        'viagra', 'casino', 'loan', 'credit', 'debt', 'make money fast',
        'earn money', 'work from home', 'weight loss', 'diet pills',
        'free money', 'lottery', 'winner', 'claim your prize'
    ]

    const message = (data.message || '').toLowerCase()
    const name = (data.name || '').toLowerCase()

    // Check for spam keywords
    const hasSpamKeywords = spamKeywords.some(keyword =>
        message.includes(keyword) || name.includes(keyword)
    )

    // Check message length
    if (data.message && data.message.length < 10) {
        return true
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
        return true
    }

    return hasSpamKeywords
}

// Email template function
const createEmailContent = (data) => {
        let subject = `Portfolio İletişim - ${data.contactReason || 'Genel İletişim'}`

        let body = `
Merhaba Eylem,

Yeni bir iletişim mesajı aldınız:

İletişim Sebebi: ${data.contactReason || 'Belirtilmemiş'}

${data.projectType ? `Proje Türü: ${data.projectType}\n` : ''}
${data.budget ? `Bütçe: ${data.budget}\n` : ''}
${data.timeline ? `Zaman Çizelgesi: ${data.timeline}\n` : ''}

Mesaj:
${data.message}

İletişim Bilgileri:
Ad Soyad: ${data.name}
E-posta: ${data.email}
${data.phone ? `Telefon: ${data.phone}\n` : ''}

Tarih: ${new Date().toLocaleDateString('tr-TR')}
IP Adresi: ${data.ip || 'Bilinmiyor'}

---
Bu mesaj portfolio sitenizden otomatik olarak gönderilmiştir.
    `
    
    return { subject, body }
}

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Eylem Portfolio API is running!' });
});

// Visit counter endpoint
app.get('/api/visit', async(req, res) => {
    try {
        const ip = req.ip
        const today = new Date().toISOString().split('T')[0]
        
        if (redisClient) {
            const key = `visits:${today}`

            // Increment counter in Redis
            await redisClient.incr(key)

            // Get total visits for today
            const visits = await redisClient.get(key)

            // Store in Firestore for persistence
            await db.collection('visits').doc(today).set({
                count: parseInt(visits),
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true })

            res.json({ visits: parseInt(visits) })
        } else {
            // Fallback without Redis
            const visits = 1
            await db.collection('visits').doc(today).set({
                count: visits,
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true })

            res.json({ visits })
        }
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Contact form endpoint
app.post('/api/contact', async(req, res) => {
    try {
        const { name, email, phone, message, contactReason, projectType, budget, timeline } = req.body
        const clientIP = req.ip

        // Rate limiting
        if (rateLimiter) {
            try {
                await rateLimiter.consume(clientIP)
            } catch (rejRes) {
                return res.status(429).json({ 
                    error: 'Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.',
                    retryAfter: Math.round(rejRes.msBeforeNext / 1000)
                })
            }
        }

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Ad, e-posta ve mesaj alanları zorunludur' })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Geçersiz e-posta formatı.' })
        }

        // Validate phone format if it exists
        if (phone) {
            const phoneRegex = /^[+]?[0-9()\s-]{10,15}$/
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ error: 'Geçersiz telefon numarası formatı.' })
            }
        }

        // Spam check
        if (checkForSpam({ name, email, message })) {
            return res.status(400).json({ error: 'Spam tespit edildi. Lütfen mesajınızı kontrol edin.' })
        }

        // Store in Firestore (if available)
        const messageData = {
            name,
            email,
            phone: phone || null,
            message,
            contactReason: contactReason || null,
            projectType: projectType || null,
            budget: budget || null,
            timeline: timeline || null,
            ip: clientIP,
            createdAt: new Date()
        }

        try {
            await db.collection('messages').add({
                ...messageData,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            })
            console.log('Message saved to Firestore')
        } catch (firestoreError) {
            console.warn('Firestore save failed:', firestoreError.message)
            // Continue without Firestore
        }

        // Send email (if configured)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const emailContent = createEmailContent({
                    ...messageData,
                    ip: clientIP
                })

                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.CONTACT_EMAIL || 'eylemseyhaann@gmail.com',
                    subject: emailContent.subject,
                    text: emailContent.body,
                    html: emailContent.body.replace(/\n/g, '<br>')
                })

                console.log('Email sent successfully')
            } catch (emailError) {
                console.error('Email sending failed:', emailError)
                // Don't fail the request if email fails
            }
        } else {
            console.log('Email not configured, skipping email send')
        }

        res.json({ 
            success: true, 
            message: 'Mesajınız başarıyla gönderildi. En kısa sürede size döneceğim.' 
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' })
    }
})

// Projects endpoint
app.get('/api/projects', async (req, res) => {
    try {
        const projectsSnapshot = await db.collection('projects').orderBy('order', 'asc').get();
        if (projectsSnapshot.empty) {
            return res.status(404).json({ error: 'No projects found' });
        }
        const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Single project endpoint
app.get('/api/projects/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const projectDoc = await db.collection('projects').doc(projectId).get();

        if (!projectDoc.exists) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ id: projectDoc.id, ...projectDoc.data() });
    } catch (error) {
        console.error('Error fetching single project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})