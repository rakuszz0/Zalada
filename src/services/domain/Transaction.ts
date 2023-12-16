import * as TransactionDto from "../models/Transaction";
import * as TransactionRepository from "../repository/Transaction";

export async function getTransactionDetailsDomain({customer_id, order_no}: TransactionDto.GetTransactionDetailsQueryParams) {
    const transaction = await TransactionRepository.DBCheckTransactionExist({customer_id, order_no})
    const payment = await TransactionRepository.DBCheckPaymentTypeExist(transaction.payment_type)
    const orders = await TransactionRepository.DBGetOrders(order_no)

    return {
        order_no,
        payment_type: payment.bank_name,
        payment_at: transaction.payment_at,
        created_at: transaction.created_at,
        shipping_at: transaction.shipping_at,
        arrived_at: transaction.arrived_at,
        status: TransactionDto.TransactionStatus[transaction.status],
        items: orders
    }
}

export async function getOrdersDomain(order_no: string) {
    return await TransactionRepository.DBGetOrders(order_no)
}