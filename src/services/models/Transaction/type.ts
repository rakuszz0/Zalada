import * as z from "zod"
import { createOrderRequest, productList, transactionListResponse } from "./schema"

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

// export type TransactionHistoryRequest = z.infer<typeof transactionHistoryRequest>
// export type TransactionHistoryResponse = z.infer<typeof transactionHistoryResponse>;
// export type ProductList = z.infer<typeof productList>;

// export type TransactionHistoryParams = {
//     userid: number;
//     status?: TransactionStatus;
// }

// export type TransactionHistoryResult = {
//     order_no: string;
//     product_id: number;
//     order_time: string;
//     status: number;
//     customer_id: number;
//     payment_type: number;
//     verified_by: number;
//     price: number;
//     quantity: number;
// }

export type TransactionListResult = {
    order_no: string;
    status: number;
    customer_id: number;
    order_time: string;
    payment_type: string;
    verified_by: number;
    product_id: number;
    price: number;
    quantity: number;
}

export type TransactionListResponse = z.infer<typeof transactionListResponse>;
export type ProductList = z.infer<typeof productList>;