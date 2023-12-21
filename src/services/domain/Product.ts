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

export async function orderHistoryByDeliveryStatusHandler() {
    return await ProductRepository.DBGetProducts()
}

export async function getProductDetailsDomain(id:number) {
    const product_detail= await ProductRepository.DBGetProductsDetails(id)
    const reviews = await ProductRepository.DBProductReviews(id)

    return {...product_detail,reviews}
}