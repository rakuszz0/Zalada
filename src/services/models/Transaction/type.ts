import * as z from "zod"
import { getOrderDetailsRequest } from "./schema";

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