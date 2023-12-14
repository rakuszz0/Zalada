import * as z from "zod"
import { paymentOrderRequest } from "./schema"

export enum TransactionStatus {
    PENDING = "0",
    PACKING = "1",
    DELIVERY = "2",
    ARRIVED = "3",
    FINISHED = "4",
    CANCEL = "5"
}

export type PaymentOrderRequest = z.infer<typeof paymentOrderRequest>

export type CheckOrderExistQueryParams = {
    order_no: string
    status: TransactionStatus
    customer_id: number
}

export type UpdateOrderStatusQueryParams = {
    order_no: string
    status: TransactionStatus | number
}

export type CheckTransactionExistQueryParams = {
    customer_id: number
    order_no: string
}

export type PaymentOrderDomainParams = PaymentOrderRequest & { customer_id: number }