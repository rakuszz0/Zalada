import db from "@database"
import * as LogDto from "../models/Log"
import { ResultSetHeader } from "mysql2"

export async function DBCreateActivityLog({ method, params, time, url, user_id, ip }: LogDto.CreateActivityLogQueryParams) {
    const values = [
        [method, url, user_id, params, time, ip]
    ]

    const query = await db.query<ResultSetHeader>(`INSERT INTO logs (method, url, user_id, params, time, ip) VALUES ?`, [values])

    return query
}

export async function DBActivityLogList({ limit = 500, search = "1=1", sort = "DESC" }: LogDto.ActivityLogListQueryParams) {
    return await db.query<LogDto.ActivityLogListQueryResult[]>(`
        SELECT l.id, l.method, l.url, u.username, l.ip, l.params, l.time FROM logs l 
        LEFT JOIN users u ON u.id = l.user_id
        WHERE ${search}
        ORDER BY l.time ${sort}
        LIMIT ${limit + 1}
    `)
}
