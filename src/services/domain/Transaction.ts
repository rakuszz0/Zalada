import * as TransactionRepository from "../repository/Transaction";
import * as TransactionDto from "../models/Transaction";
import { ServerError } from "src/config/error";
import { QueryRunner } from "typeorm";

export async function createTransactionDomain(transaction: TransactionDto.CreateTransactionQueryParams, queryRunner?: QueryRunner) {
    const result = await TransactionRepository.DBCreateTransaction(transaction, queryRunner)

    if(result.affectedRows < 1) {
        throw new ServerError("FAILED_CREATE_TRANSACTION")
    }

    return true
}