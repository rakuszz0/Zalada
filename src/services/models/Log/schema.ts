import { buildJsonSchemas } from "fastify-zod"
import * as z from "zod"

export const activityLogListRequest = z.object({
    limit: z.number().min(1).optional(),
    sort: z.enum(["ASC", "DESC"]).optional(),
    search: z.string().optional().describe(JSON.stringify({ user_id: "number", method: "string", url: "string", time: "number", username: "string" })),
    lastId: z.number().optional()
})


export const { schemas: logSchemas, $ref: logSchema } = buildJsonSchemas({
    activityLogListRequest
}, { $id: "logSchema" })