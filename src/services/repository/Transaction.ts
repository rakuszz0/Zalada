import db from "@database"
import * as ProductDto from "../models/Transaction"

export async function DBGetTransactionDetails({customer_id, order_no}: ProductDto.GetTransactionDetailsQueryParams) {
    const query = await db.query<ProductDto.GetTransactionDetailsQueryResult[]>(`SELECT p.name product_name, t.quantity, p.price, b.bank_name, b.account ,t.order_time FROM transactions t LEFT JOIN products p ON p.id = t.product_id LEFT JOIN banks b ON b.id = t.payment_type WHERE t.customer_id = ? AND t.order_no = ?`, [customer_id, order_no])
    return query
}