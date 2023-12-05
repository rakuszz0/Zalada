import db from "@database"

class DatabaseService {
    async init() {
        await db.initialize()
    }
    
    getDatasource() {
        return db
    }
}

export default new DatabaseService()