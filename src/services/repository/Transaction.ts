import db from "@database"
import * as TransactionDto from "../models/Transaction"
import { NotFoundError } from "src/config/error"

export async function DBCheckTransactionExist({customer_id, order_no}: TransactionDto.GetTransactionDetailsQueryParams) {
    const query = await db.query<TransactionDto.Transaction[]>(`SELECT t.order_no, t.created_at, t.status, t.payment_type, t.verified_by, t.payment_at, t.shipping_at, t.arrived_at FROM transactions t WHERE t.customer_id = ? AND t.order_no = ?`, [customer_id, order_no])

    if(query.length < 1) {
        throw new NotFoundError("TRANSACTION_NOT_FOUND")
    }

    return query[0]
}

export async function DBGetOrders(order_no: string) {
    return await db.query<Array<{product_name: string, price: number, quantity: number}>>(`SELECT p.name product_name, o.price, o.quantity FROM orders o LEFT JOIN products p ON p.id = o.product_id WHERE o.order_no = ?`, [order_no])
}

export async function DBCheckPaymentTypeExist(payment_type: number) {
    const query = await db.query<Array<{id: number, bank_name: string, account: string}>>(`SELECT id, bank_name, account FROM banks WHERE id = ?`, [payment_type])

    if(query.length < 1) {
        throw new NotFoundError("PAYMENT_TYPE_NOT_FOUND")
    }

    return query[0]
}