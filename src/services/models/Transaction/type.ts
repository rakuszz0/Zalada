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
    status: TransactionStatus | number
    customer_id: number
    payment_type: number
}

export type CreateTransactionDomainParams = CreateOrderRequest & {customer_id: number}

export type GetPaymentTypeQueryResult = {
    id: number
    bank_name: string
    account: string
}

export type CreateOrderQueryParams = {
    order_no: string
    product_id: number
    price: number
    quantity: number
}