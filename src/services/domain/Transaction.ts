import * as TransactionRepository from "../repository/Transaction";
import * as TransactionDto from "../models/Transaction";
import { NotFoundError, ServerError } from "src/config/error";
import { QueryRunner } from "typeorm";

export async function createTransactionDomain(transaction: TransactionDto.CreateTransactionQueryParams, queryRunner?: QueryRunner) {
    const result = await TransactionRepository.DBCreateTransaction(transaction, queryRunner)

    if(result.affectedRows < 1) {
        throw new ServerError("FAILED_CREATE_TRANSACTION")
    }

    return true
}

export async function checkPaymentExistDomain(payment_type: number) {
    const result = await TransactionRepository.DBCheckPaymentExist(payment_type)

    if(result.length < 1) {
        throw new NotFoundError("PAYMENT_TYPE_NOT_FOUND")
    }

    return result[0]
}

export async function getPaymentTypesDomain() {
    return await TransactionRepository.DBGetPaymentTypes()
}