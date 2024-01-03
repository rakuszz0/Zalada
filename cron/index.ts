import db from '../ormconfig'
import { CronOrderAutoCancel } from './scripts/Transaction'

async function main() {
    try {
        await db.initialize()
        await CronOrderAutoCancel()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()

