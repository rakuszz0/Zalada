import db from "../../ormconfig"
import { CronJob } from "cron/dist"
import moment from "moment"

// Cron for cancel order when customer not pay order for 2 hours
export async function CronOrderAutoCancel() {
    const job = CronJob.from({
        cronTime: `*/1 * * * *`,
        onTick: async () => {
            const transactions = await db.query<Array<{ order_no: string, created_at: number }>>(`SELECT order_no, created_at FROM transactions WHERE status = 1 AND ${moment().unix()} - created_at > 7200`)

            for (const trans of transactions) {
                const orders = await db.query<Array<{ product_id: number, quantity: number }>>(`SELECT product_id, quantity FROM orders WHERE order_no = ?`, [trans.order_no])
                for (const order of orders) {
                    const [product] = await db.query(`SELECT stock FROM products WHERE id = ?`, [order.product_id])
                    await db.query(`UPDATE products SET stock = ? WHERE id = ?`, [product.stock + order.quantity, order.product_id])
                }

                await db.query(`UPDATE transactions SET status = ? WHERE order_no = ?`, [7, trans.order_no])
            }
        },
        start: false,
        context: "ORDER_AUTOCANCEL"
    })

    try {
        console.log(`${job.context}_RUNNING`)
        job.start()
    } catch (error) {
        console.log(`ERROR_${job.context}`)
        job.stop()
    }
}