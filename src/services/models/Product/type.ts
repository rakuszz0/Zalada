import * as z from "zod"
import { addProductsRequest, deleteProductRequest, getProductRequest, getProductResponse, getProductsResponse, updateProductRequest } from "./schema"

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


export type InsertProductTrashResult = {
    product_id:number;
    name:string;
    description: string
    price: number
    store_id:number
}

export type DeleteProductQuery = {
    product_id:number
}

export type DeleteProductRequest = z.infer<typeof deleteProductRequest>