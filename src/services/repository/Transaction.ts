import db from "@database";
import * as TransactionDto from "../models/Transaction";
import { ResultSetHeader } from "mysql2";
import { QueryRunner } from "typeorm";
import { NotFoundError, ServerError } from "src/config/error";


export async function DBCreateTransaction({ customer_id, order_no, payment_type, status }: TransactionDto.CreateTransactionQueryParams, queryRunner?: QueryRunner) {
    const transaction = [
        [order_no, status, customer_id, payment_type]
    ]

    const query = await db.query<ResultSetHeader>(`INSERT INTO transactions (order_no, status, customer_id, payment_type) VALUES ?`, [transaction], queryRunner)
    
    if(query.affectedRows < 1) {
        throw new ServerError("FAILED_CREATE_TRANSACTION")
    }

    return query   
}

export async function DBCheckPaymentExist(payment_type: number) {
    const query = await db.query<Array<{id: number}>>(`SELECT id FROM banks WHERE id = ?`, [payment_type])

    if(query.length < 1) {
        throw new NotFoundError("PAYMENT_TYPE_NOT_FOUND")
    }

    return query[0]
}

export async function DBGetPaymentTypes() {
    return await db.query<TransactionDto.GetPaymentTypeQueryResult[]>(`SELECT id, bank_name, account FROM banks`)
}

export async function DBCreateOrder({order_no, price, product_id, quantity}: TransactionDto.CreateOrderQueryParams, queryRunner?: QueryRunner) {
    const order = [
        [order_no, product_id, price, quantity]
    ]

    const query = await db.query<ResultSetHeader>(`INSERT INTO orders (order_no, product_id, price, quantity) VALUES ?`, [order], queryRunner)

    if(query.affectedRows < 1) {
        throw new ServerError("FAILED_CREATE_ORDER")
    }

    return query
}

export async function DBTransactionHistory(params: TransactionDto.TransactionHistoryParams) {
  const transactionHistory = await db.query<TransactionDto.TransactionHistoryResult[]>(`SELECT t.status, t.customer_id, t.payment_type, t.verified_by, t.order_time, o.order_no, o.product_id, o.price, o.quantity FROM transactions t INNER JOIN orders o ON t.order_no = o.order_no WHERE t.customer_id = ? ${params.status ? `AND t.status = ${params.status}`: ''}`, [params.userid]);

  return transactionHistory;
}
