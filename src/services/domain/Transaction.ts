import { RequestError } from "src/config/error";
import * as TransactionDto from "../models/Transaction";
import * as TransactionRepository from "../repository/Transaction";

export async function paymentOrderDomain({amount, order_no, customer_id}: TransactionDto.PaymentOrderDomainParams) {
    const transaction = await TransactionRepository.DBCheckTransactionExist({customer_id, order_no})

    // Check if transaction has been paid
    if (transaction.status == 2) {
        throw new RequestError("TRANSACTION_HAS_BEEN_PAID")
    }

    // Check if transaction is pending
    if(transaction.status != 1) {
        throw new RequestError("INVALID_SESSION_PLEASE_CHECK_YOUR_TRANSACTION_STATUS")
    }

    const orders = await TransactionRepository.DBGetOrders(transaction.order_no)

    const total_price = orders.map(order => order.quantity * order.price).reduce((acc, curr) => acc + curr, 0)

    if(total_price != amount) {
        throw new RequestError("INVALID_AMOUNT")
    }

    // Set transaction to pending approval 
    await TransactionRepository.DBUpdateTransactionStatus({order_no, status: 2})

    return true
}