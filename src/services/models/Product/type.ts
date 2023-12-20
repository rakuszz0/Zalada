import * as z from "zod"
import { addProductReviewRequest, addProductsRequest, getProductRequest, getProductResponse, getProductsResponse, updateProductRequest } from "./schema"

export type GetProductRequest = z.infer<typeof getProductRequest>
export type GetProductQueryResult = z.infer<typeof getProductResponse>
export type GetProductsQueryResult = z.infer<typeof getProductsResponse>

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

export type ReviewProductRequest = z.infer<typeof addProductReviewRequest>

export type ReviewProductParams = {
    product_id: number;
    message?:string;
    rating:number;
    order_no:string;
    customer_id:number;
}

export type AddReviewProductQueryParams = {
    product_id: number;
    message?:string;
    rating:number;
    customer_id:number; 
}

export type ReviewProductExistQueryResult = {
    product_id: number;
    message?:string;
    rating:number;
    customer_id:number; 
}