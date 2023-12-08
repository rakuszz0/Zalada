import db from "@database"
import * as TransactionDto from "../models/Transaction"
import { ResultSetHeader } from "mysql2"
import { QueryRunner } from "typeorm"

export async function DBCheckOrderExist({order_no, status, customer_id}: TransactionDto.CheckOrderExistQueryParams) {
    const query = await db.query<Array<{order_no: number, status: number, quantity: number, price: number}>>(`SELECT t.order_no, t.status, t.quantity, p.price FROM transactions t LEFT JOIN products p ON p.id = product_id WHERE t.order_no = ? AND t.status = ? AND t.customer_id = ?`, [order_no, status, customer_id])
    return query
}

export async function DBUpdateOrderStatus({order_no, status}: TransactionDto.UpdateOrderStatusQueryParams, queryRunner?: QueryRunner) {
    const query = await db.query<ResultSetHeader>(`UPDATE transactions SET status = ? WHERE order_no = ?`, [status, order_no], queryRunner)   
    return query
}