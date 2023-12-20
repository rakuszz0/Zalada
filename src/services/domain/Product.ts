import * as ProductRepository from "../repository/Product";
import * as ProductDto from "../models/Product";
import * as TransactionRepository from "../repository/Transaction";
import { RequestError } from "src/config/error";



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

export async function addReviewProduct({customer_id,product_id,message,order_no,rating}: ProductDto.ReviewProductParams) {

    const transaction = await TransactionRepository.DBCheckTransactionExist({customer_id, order_no})
    if(transaction.status < 6 || transaction.status != 6 ) {
        throw new RequestError("NEED_TO_COMPLATE_THE_TRANSACTION")
    }

    const reviewProduct = await ProductRepository.DBAddReviewTransaction({customer_id,product_id,rating,message})

    return reviewProduct
}