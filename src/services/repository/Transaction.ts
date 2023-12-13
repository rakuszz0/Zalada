import db from "@database";
import { TransactionHistoryResult, TransactionHistoryParams } from "../models/Transaction";

export async function DBTransactionHistory(params: TransactionHistoryParams) {
  const transactionHistory = await db.query<TransactionHistoryResult[]>(`SELECT t.status, t.customer_id, t.payment_type, t.verified_by, t.order_time, o.order_no, o.product_id, o.price, o.quantity FROM transactions t INNER JOIN orders o ON t.order_no = o.order_no WHERE t.customer_id = ? ${params.status ? `AND t.status = ${params.status}`: ''}`, [params.userid]);

  return transactionHistory;
}
