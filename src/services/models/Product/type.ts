import * as z from "zod"
import { addProductsRequest, getProductDetails, getProductRequest, getProductResponse, getProductsResponse, updateProductRequest, getProductDetailsResponse } from "./schema"

export type GetProductRequest = z.infer<typeof getProductRequest>
export type GetProductQueryResult = z.infer<typeof getProductResponse>
export type GetProductsQueryResult = z.infer<typeof getProductsResponse>
export type GetProductDetails = z.infer<typeof getProductDetails>
export type GetProductDetailsQueryResult = z.infer<typeof getProductDetailsResponse>


export type AddProductsRequest = z.infer<typeof addProductsRequest>

export type AddProductByAdmin = {
    name:string;
    stock:number;
    description:string;
    price:number
}

export type UpdateProductRequest = z.infer<typeof updateProductRequest>

export type UpdateProductDomainParams = UpdateProductRequest

export type UpdateProductQueryParams = {
    name: string
    stock: number
    description: string
    price: number
    product_id: number
}

export type UpdateStockQueryParams = {
    stock: number
    product_id: number
}

export type ProductReviews = {
    rating:number
    message:string
    username:string
}