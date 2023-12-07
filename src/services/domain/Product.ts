import { NotFoundError, ServerError } from "src/config/error";
import * as ProductRepository from "../repository/Product";
import * as ProductDto from "../models/Product";
import { QueryRunner } from "typeorm";

export async function getProductsDomain() {
    return await ProductRepository.DBGetProducts()
}

export async function checkProductExistDomain(product_id: number) {
    const product = await ProductRepository.DBCheckProductExist(product_id)

    if(!product) {
        throw new NotFoundError("PRODUCT_NOT_FOUND")
    }

    return product
}

export async function updateStockProduct({ product_id, stock }: ProductDto.UpdateStockQueryParams, queryRunner?: QueryRunner) {
    const result = await ProductRepository.DBUpdateStockProduct({product_id, stock}, queryRunner)

    if(result.affectedRows < 1) {
        throw new ServerError("FAILED_UPDATE_STOCK")
    }

    return result
}