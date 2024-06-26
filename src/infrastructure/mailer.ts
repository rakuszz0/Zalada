import mail, { Transporter } from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport"

class MailerService {
    private transporter: Transporter

    async init() {
        if(this.transporter) {
            return this.getTransporter()
        }

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

        return this.transporter
    }

    getTransporter() {
        return this.transporter
    }

    async sendMail(params: MailOptions) {
        if(!this.transporter) {
            this.init()
        }

        return this.transporter.sendMail(params)   
    }
}

export default new MailerService()