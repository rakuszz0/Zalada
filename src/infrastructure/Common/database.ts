import db from "@database"
import { Infrastructure } from "./base"

class DatabaseService extends Infrastructure {
    async init() {
        await db.initialize()
    }
    
    getInstance() {
        return db
    }
}

export default new DatabaseService()