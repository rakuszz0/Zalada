import * as z from "zod"
import { addProductsRequest, getProductDetails, getProductListRequest, getProductRequest, getProductResponse, updateProductRequest, getProductDetailsResponse } from "./schema"

export type GetProductRequest = z.infer<typeof getProductRequest>
export type GetProductQueryResult = z.infer<typeof getProductResponse>


export type GetProductsQueryResult = {
    id: number
    name: string
    total_sale: string
    description: string
    stock: number
    price: number
    ratings: string
}
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

export type GetProductsQueryParams = {
    search?: string
    limit?: number
    sort?: string
    filter?: string
}

export type GetProductListRequest = z.infer<typeof getProductListRequest>

export type GetProductsDomainParams = GetProductListRequest

export type ProductReviews = {
    rating:number
    message:string
    username:string
}