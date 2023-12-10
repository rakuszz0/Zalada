import * as z from "zod"
import { createOrderRequest } from "./schema"

export enum TransactionStatus {
    PENDING = "0",
    PACKING = "1",
    DELIVERY = "2",
    ARRIVED = "3",
    FINISHED = "4",
    CANCEL = "5"
}

export type CreateOrderRequest = z.infer<typeof createOrderRequest>

export type CreateTransactionQueryParams = {
    order_no: string
    status: TransactionStatus
    product_id: number
    customer_id: number
    payment_type: number
    quantity: number
}

export type GetPaymentTypeQueryResult = {
    id: number
    bank_name: string
    account: string
}