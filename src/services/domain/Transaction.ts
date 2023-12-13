import * as TransactionRepository from "../repository/Transaction";
import { TransactionHistoryParams, TransactionHistoryResponse } from "src/services/models/Transaction";


export async function TransactionHistoryDomain(params: TransactionHistoryParams) {
    const transactionHistory = await TransactionRepository.DBTransactionHistory(params);

    if(transactionHistory.length < 1){
        throw new Error("NO_TRANSACTIONS_FOUND")
    }

    const result: TransactionHistoryResponse = {}

    for(const item of transactionHistory){
        if(!result[item.order_no]){
            result[item.order_no] = {
                order_no: item.order_no,
                product: [],
                status: item.status,
                customer_id: item.customer_id,
                payment_type: item.payment_type,
                order_time: item.order_time,
                verified_by: item.verified_by
            }
        }
        
        result[item.order_no].product.push({
            product_id: item.product_id,
            price: item.price,
            quantity: item.quantity
        })
    }

    return result;
}