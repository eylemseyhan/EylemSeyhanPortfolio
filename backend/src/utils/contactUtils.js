const checkForSpam = (data) => {
    const spamKeywords = [
        'viagra', 'casino', 'loan', 'credit', 'debt', 'make money fast',
        'earn money', 'work from home', 'weight loss', 'diet pills',
        'free money', 'lottery', 'winner', 'claim your prize'
    ];

    const message = (data.message || '').toLowerCase();
    const name = (data.name || '').toLowerCase();

    // Check for spam keywords
    const hasSpamKeywords = spamKeywords.some(keyword =>
        message.includes(keyword) || name.includes(keyword)
    );

    // Basic validation
    if (!data.message || data.message.length < 10) {
        return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return true;
    }

    return hasSpamKeywords;
};

const createEmailContent = (data) => {
        let subject = `Portfolio İletişim Formu - ${data.name}`;

        let body = `
Merhaba Eylem,

Portfolio sitenden yeni bir iletişim mesajı aldın:

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
`;

    return { subject, body };
};

module.exports = {
    checkForSpam,
    createEmailContent
};