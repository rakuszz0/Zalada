import db from "@database";
import { CustomerOrderHistoryByDeliveryStatusResponse, CustomerOrderHistoryByDeliveryStatusParams } from "../models/Transaction";

export async function DBCustomerOrderHistoryByDeliveryStatus(params: CustomerOrderHistoryByDeliveryStatusParams) {
  const orderHistory = await db.query<CustomerOrderHistoryByDeliveryStatusResponse>(`SELECT order_no, product_id, quantity, order_time, status, customer_id, payment_type FROM transactions WHERE customer_id = ? ${params.status ? 'AND status = ?':'' } `, [params.userid, params.status]);
  return orderHistory;
}
