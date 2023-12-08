import { NotFoundError, RequestError } from "src/config/error";
import * as TransactionDto from "../models/Transaction";
import * as TransactionRepository from "../repository/Transaction";
import { QueryRunner } from "typeorm";


export async function checkOrderExistDomain({order_no, status, customer_id}: TransactionDto.CheckOrderExistQueryParams) {
    const query = await TransactionRepository.DBCheckOrderExist({order_no, status, customer_id}) 

    if(query.length < 1) {
        throw new NotFoundError("ORDER_NOT_FOUND")
    } 

    return query
}

export async function updateOrderStatusDomain({order_no, status}: TransactionDto.UpdateOrderStatusQueryParams, queryRunner?: QueryRunner) {
    const query = await TransactionRepository.DBUpdateOrderStatus({order_no, status}, queryRunner)

    if(query.affectedRows < 1) {
        throw new RequestError("FAILED_UPDATE_ORDER_STATUS")
    }

    return query
}