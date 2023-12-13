import * as TransactionRepository from "../repository/Transaction";
import { CustomerOrderHistoryByDeliveryStatusParams } from "src/services/models/Transaction";


export async function CustomerOrderHistoryByDeliveryStatusDomain(params: CustomerOrderHistoryByDeliveryStatusParams
    ) {
    const orderHistory = await TransactionRepository.DBCustomerOrderHistoryByDeliveryStatus(params);
    return orderHistory.length > 0 ? orderHistory : [];
}