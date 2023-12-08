import { buildJsonSchemas } from "fastify-zod"
import * as z from "zod"

export const paymentOrderRequest = z.object({
    order_no: z.string(),
    amount: z.number().min(1)
})

export const paymentOrderResponse = z.object({
    message: z.boolean()
})


export const { schemas: transactionSchemas, $ref: transactionSchema } = buildJsonSchemas({
    paymentOrderRequest,
    paymentOrderResponse
}, { $id: "transactionSchema" })