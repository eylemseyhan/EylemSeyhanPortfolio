const { db, admin } = require('../config/firebase');
const { sendContactEmail } = require('../services/emailService');
const { checkForSpam } = require('../utils/contactUtils');

const handleContactForm = async(req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const clientIP = req.ip;

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

        // --- Spam Check ---
        if (checkForSpam({ name, email, message })) {
            console.warn(`Spam detected from IP: ${clientIP}`);
            return res.status(400).json({ error: 'Spam tespit edildi. Lütfen mesajınızı kontrol edin.' });
        }

        const messageData = {
            name,
            email,
            phone: phone || null,
            message,
            ip: clientIP,
            createdAt: new Date() // Keep a non-server-timestamp for email
        };

        // --- Save to Firestore ---
        try {
            await db.collection('messages').add({
                ...messageData,
                createdAt: admin.firestore.FieldValue.serverTimestamp() // Use server timestamp for DB
            });
            console.log('Message saved to Firestore');
        } catch (dbError) {
            console.error('Firestore save failed:', dbError.message);
            // Decide if you want to stop or continue if DB save fails
        }

        // --- Send Email ---
        try {
            await sendContactEmail({...messageData, ip: clientIP });
        } catch (emailError) {
            console.error('Contact form email sending failed:', emailError.message);
            // Don't fail the entire request if only email fails
        }

        res.status(200).json({
            success: true,
            message: 'Mesajınız başarıyla gönderildi. En kısa sürede size döneceğim.'
        });

    } catch (error) {
        console.error('Error in contact form handler:', error);
        res.status(500).json({ error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
    }
};

module.exports = {
    handleContactForm
};