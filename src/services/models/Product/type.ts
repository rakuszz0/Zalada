import * as z from "zod"
import { addProductsRequest, getProductRequest, getProductResponse, getProductsResponse } from "./schema"

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