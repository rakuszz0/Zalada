import db from "@database"
import * as TransactionDto from "../models/Transaction"
import { ResultSetHeader } from "mysql2"
import { QueryRunner } from "typeorm"
import { NotFoundError, ServerError } from "src/config/error"

export async function DBCheckOrderExist({order_no, status, customer_id}: TransactionDto.CheckOrderExistQueryParams) {
    const query = await db.query<Array<{order_no: number, status: number, quantity: number, price: number}>>(`SELECT t.order_no, t.status, t.quantity, p.price FROM transactions t LEFT JOIN products p ON p.id = product_id WHERE t.order_no = ? AND t.status = ? AND t.customer_id = ?`, [order_no, status, customer_id])
    return query
}

export async function DBUpdateTransactionStatus({order_no, status}: TransactionDto.UpdateOrderStatusQueryParams, queryRunner?: QueryRunner) {
    const query = await db.query<ResultSetHeader>(`UPDATE transactions SET status = ? WHERE order_no = ?`, [status, order_no], queryRunner)

    if(query.affectedRows < 1) {
      throw new ServerError("FAILED_UPDATE_TRANSACTION_STATUS")
    }

    return query
}

export async function DBCheckTransactionExist({ customer_id, order_no }: TransactionDto.CheckTransactionExistQueryParams) {
  const query = await db.query<Array<{ order_no: string, order_time: Date, status: number, payment_type: number }>>(`SELECT t.order_no, t.order_time, t.status, t.payment_type FROM transactions t WHERE t.customer_id = ? AND t.order_no = ?`, [customer_id, order_no])

  if (query.length < 1) {
    throw new NotFoundError("TRANSACTION_NOT_FOUND")
  }

  return query[0]
}

export async function DBGetOrders(order_no: string) {
  return await db.query<Array<{ product_name: string, price: number, quantity: number }>>(`SELECT p.name product_name, o.price, o.quantity FROM orders o LEFT JOIN products p ON p.id = o.product_id WHERE o.order_no = ?`, [order_no])
}