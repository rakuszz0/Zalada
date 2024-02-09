import * as z from "zod"
import { addProductToCartRequest, deleteProductFromCartRequest } from "./schema"

export type AddProductToCartRequest = z.infer<typeof addProductToCartRequest>

export type AddProductToCartParams = AddProductToCartRequest &  {
    userid: number;
}

export type DeleteProductFromCartRequest = z.infer<typeof deleteProductFromCartRequest>
export type DeleteProductFromCartParams = DeleteProductFromCartRequest & {
    userid: number
}

export type DeleteProductFromCartQueryParams = {
    userid: number
    product_id: number
}

export type CheckProductFromCartParams = {
    customer_id: number
    product_id: number
}

export type CheckProductFromCartQueryResult = {
    id: number
    product_id: number
    customer_id: number
    quantity: number
}

export type UpdateProductCartParams = {
    customer_id: number
    product_id: number
    quantity: number
}