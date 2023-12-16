import { buildJsonSchemas } from 'fastify-zod'
import * as z from 'zod'

export const paginationRequest = z.object({
    limit: z.number().min(1).optional(),
    sort: z.enum(["DESC", "ASC"]).optional(),
    lastId: z.number().optional(),
    search: z.string().optional()
})

export const {schemas: commonSchemas, $ref: commonSchema} = buildJsonSchemas({
    paginationRequest
}, {
    $id: "commonSchema"
})