const nodemailer = require('nodemailer');
const { createEmailContent } = require('../utils/contactUtils');

let transporter;

// Initialize transporter only if email credentials are set
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // Use App Password for Gmail
        }
    });
} else {
    console.warn('Email credentials not set. Email sending will be disabled.');
}

const sendContactEmail = async(formData) => {
    if (!transporter) {
        console.log('Email service is not configured, skipping email send.');
        return; // Indicate that email was not sent
    }

    try {
        const emailContent = createEmailContent(formData);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || 'eylemseyhaann@gmail.com',
            subject: emailContent.subject,
            text: emailContent.body,
            html: emailContent.body.replace(/\n/g, '<br>')
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Email sending failed:', error);
        // Re-throw the error to be handled by the controller
        throw new Error('Failed to send email.');
    }
};

module.exports = {
    sendContactEmail
};