import * as ProductRepository from "../repository/Product";

export async function getProductsDomain() {
    return await ProductRepository.DBGetProducts()
}

export async function getProductDetailsDomain(id:number) {
    return await ProductRepository.DBGetProductsDetails(id)
}