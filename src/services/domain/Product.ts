import * as ProductRepository from "../repository/Product";

export async function getProducts() {
    return await ProductRepository.DBGetProducts()
}