import { productList, transactionHistoryRequest, transactionHistoryResponse } from "./schema";
import * as z from "zod";

export type TransactionHistoryRequest = z.infer<typeof transactionHistoryRequest>
export type TransactionHistoryResponse = z.infer<typeof transactionHistoryResponse>;
export type ProductList = z.infer<typeof productList>;

export enum TransactionStatus {
    PENDING_PAYMENT = 1,
    PENDING_APPROVAL = 2,
    PACKING = 3,
    DELIVERY = 4,
    ARRIVED = 5,
    FINISHED = 6,
    CANCEL = 7
}

export type TransactionHistoryParams = {
    userid: number;
    status?: TransactionStatus;
}

export type TransactionHistoryResult = {
    order_no: string;
    product_id: number;
    order_time: string;
    status: number;
    customer_id: number;
    payment_type: number;
    verified_by: number;
    price: number;
    quantity: number;
}