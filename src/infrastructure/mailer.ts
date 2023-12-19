import mail, { Transporter } from "nodemailer"

class MailerService {
    private transporter: Transporter

    async init() {
        this.transporter = mail.createTransport({
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            secure: true,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }

        })
    }

    getTransporter() {
        return this.transporter
    }

    sendMail() {
        
    }
}

export default new MailerService()