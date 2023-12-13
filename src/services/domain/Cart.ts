import { NotFoundError, ServerError } from "src/config/error";
import * as CartDto from "../models/Cart";
import * as CartRepository from "../repository/Cart";


export async function AddProductToCartDomain(params: CartDto.AddProductToCartParams) {
    const addProductToCart =  await CartRepository.DBAddProductToCart(params)

    if (addProductToCart.affectedRows < 1) {
        throw new NotFoundError("FAILED_ADD_PRODUCT_TO_CART")
    }
    
    return addProductToCart
}