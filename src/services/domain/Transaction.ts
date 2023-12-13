import * as ProductDto from "../models/Transaction";
import * as TransactionRepository from "../repository/Transaction";

export async function getTransactionDetailsDomain({customer_id, order_no}: ProductDto.GetTransactionDetailsQueryParams) {
    const transaction = await TransactionRepository.DBCheckTransactionExist({customer_id, order_no})
    const payment = await TransactionRepository.DBCheckPaymentTypeExist(transaction.payment_type)
    const orders = await TransactionRepository.DBGetOrders(order_no)

    return {
        order_no,
        payment_type: payment.bank_name,
        status: transaction.status,
        items: orders
    }
}

export async function getOrdersDomain(order_no: string) {
    return await TransactionRepository.DBGetOrders(order_no)
}