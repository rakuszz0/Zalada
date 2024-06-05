import db from "@database"
import { CronJob } from "cron/dist"
import moment from "moment"
import Handlebars from "handlebars"
import fs from "fs"
import path from "path"
import InfraMail from "@infrastructure/mailer"

// Cron for cancel order when customer not pay order for 2 hours
export async function CronOrderAutoCancel() {
    const job = CronJob.from({
        cronTime: `*/1 * * * *`,
        onTick: async () => {
            try {
                // Check transactions that pending transaction for more than 2 hours
                const transactions = await db.query<Array<{ order_no: string, created_at: number }>>(`SELECT order_no, created_at FROM transactions WHERE status = 1 AND ${moment().unix()} - created_at > ${process.env.PENDING_ORDER_MAX_TIME}`)

                for (const trans of transactions) {
                    const orders = await db.query<Array<{ product_id: number, quantity: number }>>(`SELECT product_id, quantity FROM orders WHERE order_no = ?`, [trans.order_no])
                    for (const order of orders) {
                        const [product] = await db.query(`SELECT stock FROM products WHERE id = ?`, [order.product_id])

                        // Set the product stock back to previous order
                        await db.query(`UPDATE products SET stock = ? WHERE id = ?`, [product.stock + order.quantity, order.product_id])
                    }

                    // Set order to cancelled
                    await db.query(`UPDATE transactions SET status = ? WHERE order_no = ?`, [7, trans.order_no])
                }
            } catch (error) {
                throw error
            }      
        },
        start: false,
        context: "ORDER_AUTOCANCEL"
    })

    try {
        job.start()
    } catch (error) {
        throw error
        // job.stop()
    }
}

export async function CronSendNotificationLowStock() {
    const job = CronJob.from({
        cronTime: "0 21 * * *",
        onTick: async () => {
            try {
                const products = await db.query('SELECT * FROM products WHERE stock < ?', [process.env.LOW_STOCK_TRESHOLD])
                if (products.length) {
                    const users = await db.query<Array<{ email: string }>>('SELECT email FROM users')
                    for (const user of users) {
                        const template = Handlebars.compile(fs.readFileSync(path.join(__dirname, '../../src/services/templates/low-stock.handlebars')))

                        const html = template({ products })

                        await InfraMail.sendMail({ to: user.email, subject: "Low Stock Notification", html })
                    }
                }
            } catch (error) {
                throw error
            }
        }
    })

    try {
        job.start()
    } catch (error) {
        throw error
        // job.stop()
    }
}