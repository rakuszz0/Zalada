import * as z from "zod"
import { createOrderRequest } from "./schema"

export enum TransactionStatus {
    PENDING_PAYMENT = 1,
    PENDING_APPROVAL = 2,
    PACKING = 3,
    DELIVERY = 4,
    ARRIVED = 5,
    FINISHED = 6,
    CANCEL = 7
}

export type CreateOrderRequest = z.infer<typeof createOrderRequest>

export type CreateTransactionQueryParams = {
    order_no: string
    price: number
    status: TransactionStatus | number
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