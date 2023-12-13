import { buildJsonSchemas } from "fastify-zod"
import * as z from "zod"

export const getOrderDetailsRequest = z.object({
    order_no: z.string()
})


const orders = z.object({
    product_name: z.string(),
    price: z.number(),
    quantity: z.number()
})

export const getOrderDetailsResponse = z.object({
    message: z.object({
        order_no: z.string(),
        payment_type: z.string(),
        status: z.number(),
        items: z.array(orders)
    })
})

export const {schemas: transactionSchemas, $ref: transactionSchema} = buildJsonSchemas({
    getOrderDetailsRequest,
    getOrderDetailsResponse

}, {
    $id: "transactionSchema"
})