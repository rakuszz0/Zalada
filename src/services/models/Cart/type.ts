import * as z from "zod"
import { addProductToCartRequest } from "./schema"

export type AddProductToCartRequest = z.infer<typeof addProductToCartRequest>

export type AddProductToCartParams = AddProductToCartRequest &  {
    userid: number;
}