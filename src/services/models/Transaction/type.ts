import * as z from "zod"
import { getOrderDetailsRequest } from "./schema";

export enum TransactionStatus {
    PENDING_PAYMENT = 1,
    PENDING_APPROVAL = 2,
    PACKING = 3,
    DELIVERY = 4,
    ARRIVED = 5,
    FINISHED = 6,
    CANCEL = 7
}

export type Transaction = { order_no: string, created_at: Date, status: number, payment_type: number, verified_by: Date, payment_at: Date, shipping_at: Date, arrived_at: Date }

export type GetOrderDetailsRequest = z.infer<typeof getOrderDetailsRequest>

export type GetTransactionDetailsQueryParams = {
    customer_id: number
    order_no: string
}

export type GetTransactionDetailsQueryResult = {
    product_name: string
    quantity: number
    price: number
    order_time: Date
    bank_name: string
    account: string
}