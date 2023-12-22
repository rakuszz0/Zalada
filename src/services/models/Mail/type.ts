import { SendMailOptions } from "nodemailer"

export type SendMail = Omit<SendMailOptions, 'from'>

export type OrderConfirmationMailTemplate = { product_name: string, quantity: number, price: number }

export type OrderConfirmationTemplate = { template: "ORDER_CONFIRMATION", content: { order_no: string, order_time: string, total_price: number, username: string ,items: OrderConfirmationMailTemplate[] }  }

export type LowStockTemplate = { template: "UPDATE_STOCK", content: LowStockMailTemplate[] } 

export type LowStockMailTemplate = {
    name: string,
    stock: string
}

export type GetTemplate = OrderConfirmationTemplate | LowStockTemplate