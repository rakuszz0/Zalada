import { buildJsonSchemas } from 'fastify-zod'
import * as z from 'zod'
import { BaseResponse } from './type'

export const paginationResponse = z.object({
    message: z.object({
        data: z.union([z.string(), z.number(), z.null(), z.date()]).array().array(),
        column: z.string().array(),
        hasNext: z.number()
    })
})

const requestErrorResponse = z.object({
    statusCode: z.number().default(400),
    code: z.string(),
    error: z.string(),
    message: z.string()
})

const unauthorizeErrorResponse = z.object({
    statusCode: z.number().default(401),
    code: z.string(),
    error: z.string(),
    message: z.string()
})

const forbiddenAccessErrorResponse = z.object({
    statusCode: z.number().default(403),
    code: z.string(),
    error: z.string(),
    message: z.string()
})

const serverErrorResponse = z.object({
    statusCode: z.number().default(500),
    code: z.string(),
    error: z.string(),
    message: z.string()
})
 
export const {schemas: commonSchemas, $ref: commonSchema} = buildJsonSchemas({
    paginationResponse,
    requestErrorResponse,
    unauthorizeErrorResponse,
    forbiddenAccessErrorResponse,
    serverErrorResponse
}, {
    $id: "commonSchema"
})

export function baseResponse({ statusCode = 200, schema }: BaseResponse) {
    return {
        [statusCode]: schema,
        400: commonSchema("requestErrorResponse"),
        401: commonSchema("unauthorizeErrorResponse"),
        403: commonSchema("forbiddenAccessErrorResponse"),
        500: commonSchema("serverErrorResponse")
    }
}