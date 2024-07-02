import { SendMailOptions } from "nodemailer"

export type SendMail = Omit<SendMailOptions, 'from'>

export type OrderConfirmationMailTemplate = { product_name: string, quantity: number, price: number }

type MailProps = {
    to: string
    subject: string
}

export type OrderConfirmationTemplate = { 
    template: "ORDER_CONFIRMATION", 
    props: {
        order_no: string,
        order_time: string,
        total_price: string,
        username: string,
        items: OrderConfirmationMailTemplate[]
    }
} & MailProps

export type LowStockTemplate = { 
    template: "UPDATE_STOCK", 
    props: LowStockMailTemplate[]
} & MailProps

export type LowStockMailTemplate = {
    name: string,
    stock: string
}

export type TemplateList = OrderConfirmationTemplate | LowStockTemplate