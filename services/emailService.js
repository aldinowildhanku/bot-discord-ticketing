const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, //true = 465, false = 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

module.exports = {

    async sendTranscript(toEmail, ticketNumber, filePath) {

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: toEmail,
            subject: `Transcript Ticket #${ticketNumber}`,
            text: `Halo,\n\nBerikut adalah transcript ticket kamu #${ticketNumber}.\n\nTerima kasih.`,
            attachments: [
                {
                    filename: `transcript-${ticketNumber}.txt`,
                    path: filePath
                }
            ]
        });

        console.log(`Email terkirim ke ${toEmail}`);
    }

};