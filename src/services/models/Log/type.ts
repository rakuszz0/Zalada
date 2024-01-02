import * as z from "zod"
import { activityLogListRequest } from "./schema"

export type CreateActivityLogQueryParams = {
    method: string
    url: string
    time: number
    user_id: number
    params: string
    ip: string
}

export type ActivityLogListRequest = z.infer<typeof activityLogListRequest>

export type ActivityLogListDomain = ActivityLogListRequest

export type ActivityLogListQueryParams = {
    limit?: number
    sort?: string
    search?: string
}

export type ActivityLogListQueryResult = {
    id: number
    method: string
    url: string
    username: string
    ip: string
    params: string
    time: number
}