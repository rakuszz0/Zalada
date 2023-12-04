import * as ProductRepository from "../repository/Product";

export async function getProductsDomain() {
    return await ProductRepository.DBGetProducts()
}