import db from "@database";
import * as TransactionDto from "../models/Transaction";
import { ResultSetHeader } from "mysql2";
import { QueryRunner } from "typeorm";


export async function DBCreateTransaction({ customer_id, order_no, payment_type, product_id, quantity, status }: TransactionDto.CreateTransactionQueryParams, queryRunner?: QueryRunner) {
    const transaction = [
        [order_no, status, product_id, customer_id, payment_type, quantity]
    ]
    const query = await db.query<ResultSetHeader>(`INSERT INTO transactions (order_no, status, product_id, customer_id, payment_type, quantity) VALUES ?`, [transaction], queryRunner)
    return query   
}