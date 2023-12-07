import { buildJsonSchemas } from "fastify-zod"
import * as z from "zod"

const createOrder = z.object({
    product_id: z.number(),
    quantity: z.number().min(1)
})

const createOrders = z.array(createOrder)

export const createOrderRequest = z.object({
    order: z.union([createOrder, createOrders]),
    payment_type: z.number(),
})

export const createOrderResponse = z.object({
    message: z.object({
        order_no: z.string(),
        total_price: z.number(),
        stock: z.union([z.number(), z.record(z.string(), z.number())])
    })
})

export const { schemas: transactionSchemas, $ref: transactionSchema } = buildJsonSchemas({
    createOrderRequest,
    createOrderResponse
}, {
    $id: "transactionSchemas"
})