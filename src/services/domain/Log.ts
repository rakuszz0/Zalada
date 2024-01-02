import * as LogDto from "../models/Log";
import format from "format-unicorn/safe"
import * as LogRepository from "../repository/Log";

export async function activityLogListDomain({ lastId = 0, limit = 500, search = "1=1", sort = "DESC" }: LogDto.ActivityLogListDomain) {
    const parsedSearch = format(search, {
        user_id: "l.user_id",
        method: "l.method",
        ip: "l.ip",
        time: "l.time",
        username: "u.username"
    })

    let searchClause = "1=1"

    if (parsedSearch != "" && lastId < 1) {
        // Search when search props not empty and not paginate
        searchClause = `${searchClause} AND (${parsedSearch})`
    } else if (parsedSearch != "" && lastId > 0) {
        // Search when search props not empty and wanting to paginate
        searchClause = `${searchClause} AND (${parsedSearch}) AND l.id ${sort == "ASC" ? ">" : "<"} ${lastId}`
    } else if (parsedSearch == "" && lastId > 0) {
        searchClause = `${searchClause} AND l.id ${sort == "ASC" ? ">" : "<"} ${lastId}`
    }

    const logs = await LogRepository.DBActivityLogList({ search: parsedSearch, sort, limit })

    if(logs.length < 1) {
        return {
            data: [],
            column: [],
            hasNext: -1
        }
    } 

    const result = {
        data: logs.map(log => Object.values(log)),
        column: Object.keys(logs[0]),
        hasNext: -1
    }

    if (logs.length > limit) {
        logs.length = limit
        result.data.length = limit
        result.hasNext = logs[logs.length - 1].id
    }

    return result
}