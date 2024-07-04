import mail, { Transporter } from "nodemailer"
import fs from "fs"
import path from "path"
import Handlebars from "handlebars"

import { MailOptions } from "nodemailer/lib/json-transport"
import { TemplateList } from "@services/models"
import { InfraAMQP } from "@infrastructure/Common"
import { Infrastructure } from "@infrastructure/Common/base"

class MailerService extends Infrastructure {
    private transporter: Transporter

    async init() {
        if(this.transporter) {
            return this.getInstance()
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

    getInstance() {
        return this.transporter
    }

    async sendMail(params: MailOptions) {
        if(!this.transporter) {
            this.init()
        }

        return this.transporter.sendMail(params)   
    }

    parseAndSendMail({ props, ...mail }: TemplateList) {
        let html: string
        switch(mail.template) {
            case "ORDER_CONFIRMATION":
                const order_mail = Handlebars.compile(fs.readFileSync(path.join(__dirname, '../../src/services/templates/order-confirmation.handlebars'), 'utf-8'))
                html = order_mail({ ...props })
                break
            case "UPDATE_STOCK":
                const update_stock_mail = Handlebars.compile(fs.readFileSync(path.join(__dirname, '../../src/services/templates/low-stock.handlebars'), 'utf-8'))
                html = update_stock_mail({ ...props })
                break
        }

        return InfraAMQP.publish('zalada-mail', { func: 'SendMail', ...mail, html })
    }
}

export default new MailerService()