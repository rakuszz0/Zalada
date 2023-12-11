import { NotFoundError, ServerError } from "src/config/error";
import * as ProductDto from "../models/Product";
import * as ProductRepository from "../repository/Product";
import { QueryRunner } from "typeorm";

export async function getProductsDomain() {
    return await ProductRepository.DBGetProducts()
}

export async function checkProductExistDomain(product_id: number)  {
    const product = await ProductRepository.DBCheckProductExist(product_id)

    if(product.length < 1) {
        throw new NotFoundError("PRODUCT_NOT_FOUND")
    }

    return product[0]
}

export async function updateProductDomain(product: ProductDto.UpdateProductQueryParams, queryRunner?: QueryRunner) {
    const result = await ProductRepository.DBUpdateProduct(product, queryRunner)

    if(result.affectedRows < 1) {
        throw new ServerError("FAILED_UPDATE_PRODUCT")
    }

    return result
} 