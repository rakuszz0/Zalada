import * as ProductRepository from "../repository/Product";
import * as ProductDto from "../models/Product";

export async function getProductsDomain() {
    return await ProductRepository.DBGetProducts()
}

export async function updateProductDomain({ description, name, price, product_id, stock }: ProductDto.UpdateProductDomainParams) {
    // Check Product Exist
    await ProductRepository.DBCheckProductExist(product_id)

    await ProductRepository.DBUpdateProduct({description, name, price, product_id, stock})

    return true
} 