import * as TransJob from './scripts/Transaction'

async function main() {
    try {
        await TransJob.CronOrderAutoCancel() // CRON for auto cancel order if not payed more than 2 hours
        await TransJob.CronSendNotificationLowStock() // CRON for send notification to SA and inventory for low stock
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default main
