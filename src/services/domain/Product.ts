import * as ProductRepository from "../repository/Product";

export async function getProductsDomain() {
    return await ProductRepository.DBGetProducts()
}

export async function getProductDetailsDomain(id:number) {
    const product_detail= await ProductRepository.DBGetProductsDetails(id)
    const reviews = await ProductRepository.DBProductReviews(id)

    return {...product_detail,reviews}
}