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

const getPaymentType = z.object({
    id: z.number(),
    bank_name: z.string(),
    account: z.string()
})

export const getPaymentTypesResponse = z.object({
    message: z.array(getPaymentType)
})

export const transactionHistoryRequest = z.object({
  status: z.number().optional()
});

export const productList = z.object({
  product_id: z.number(),
  price: z.number(),
  quantity: z.number()
})

export const confirmOrderRequest = z.object({
  order_no: z.string(),
})

export const transactionHistoryResponse = z.record(z.string(), z.object({
  order_no: z.string(),
  product: z.array(productList),
  order_time: z.string(),
  status: z.number(),
  customer_id: z.number(),
  payment_type: z.number(),
  verified_by: z.number()
}))

export const { schemas: transactionSchemas, $ref: transactionSchema } = buildJsonSchemas({
    createOrderRequest,
    createOrderResponse,
    getPaymentTypesResponse,
    transactionHistoryRequest,
    productList,
    transactionHistoryResponse,
    confirmOrderRequest
}, {
    $id: "transactionSchemas"
})