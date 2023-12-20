import mail, { Transporter } from "nodemailer"
import format from "format-unicorn/safe"
import OrderTemplate from "src/services/templates/order-confirmation"
import { GetTemplate, SendMail } from "src/services/models/Mail"
import LowStockTemplate from "src/services/templates/low-stock"

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

    async sendMail(params: SendMail) {
        return this.transporter.sendMail({
            ...params
        })   
    }

    async getTemplate({ template, content }: GetTemplate) {
        let temp: string = ''

        // const filepath = path.join(__dirname, '../services/templates')

        switch (template) {
            case "ORDER_CONFIRMATION":
                temp = format(OrderTemplate(content.items), content)
                // temp = format(fs.readFileSync(`${filepath}/order-confirmation.html`, 'utf-8'), content) 
                break;
            case "UPDATE_STOCK":
                temp = LowStockTemplate(content)
                // temp = format(fs.readFileSync(`${filepath}/update-stock.html`, 'utf-8'), content) 
                break;
            default:
                break;
        }

        return temp
    }
}

export default new MailerService()