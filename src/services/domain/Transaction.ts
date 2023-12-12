import * as ProductDto from "../models/Transaction";
import * as TransactionRepository from "../repository/Transaction";

export async function getTransactionDetailsDomain({customer_id, order_no}: ProductDto.GetTransactionDetailsQueryParams) {
    return await TransactionRepository.DBGetTransactionDetails({customer_id, order_no})
}