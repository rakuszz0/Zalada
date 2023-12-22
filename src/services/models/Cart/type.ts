import * as z from "zod"
import { addProductToCartRequest, deleteProductFromCartRequest } from "./schema"

export type AddProductToCartRequest = z.infer<typeof addProductToCartRequest>

export type AddProductToCartParams = AddProductToCartRequest &  {
    userid: number;
}

export type DeleteProductFromCartRequest = z.infer<typeof deleteProductFromCartRequest>
export type DeleteProductFromCartParams = DeleteProductFromCartRequest &  {
    userid: number;
}