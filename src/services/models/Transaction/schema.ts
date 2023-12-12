import { buildJsonSchemas } from "fastify-zod"
import * as z from "zod"

export const getOrderDetailsRequest = z.object({
    order_no: z.string()
})

export const getOrderDetails = z.object({
    product_name: z.string(),
    quantity: z.number(),
    price: z.number(),
    order_time: z.date(),
    bank_name: z.string(),
    account: z.string()
})

export const getOrderDetailsResponse = z.object({
    message: z.array(getOrderDetails)
})

export const {schemas: transactionSchemas, $ref: transactionSchema} = buildJsonSchemas({
    getOrderDetailsRequest,
    getOrderDetailsResponse

}, {
    $id: "transactionSchema"
})