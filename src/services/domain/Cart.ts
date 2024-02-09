import * as CartDto from "src/services/models/Cart";
import * as CartRepository from "src/services/repository/Cart";
import { RequestError } from "../models/Common";


export async function AddProductToCartDomain({ product_id, quantity, userid }: CartDto.AddProductToCartParams) {
    const cart = await CartRepository.DBFindProductFromCart({ product_id, customer_id: userid })

    if(cart) {
        await CartRepository.DBUpdateProductCart({ customer_id: userid, quantity: cart.quantity + quantity, product_id })
    } else {
        return await CartRepository.DBAddProductToCart({
            product_id, quantity, userid
        })
    }


    return true
}

export async function DeleteProductFromCartDomain({ product_id, quantity, userid }: CartDto.DeleteProductFromCartParams) {
    const cart = await CartRepository.DBCheckProductFromCart({ product_id, customer_id: userid })

    if(cart.quantity < 1) {
        await CartRepository.DBDeleteProductFromCart({
            product_id,
            userid
        })
    } else {
        if(quantity > cart.quantity) {
            throw new RequestError("QUANTITY_EXCEED_STOCK_IN_CART")
        }

        await CartRepository.DBUpdateProductCart({
            customer_id: userid,
            product_id,
            quantity: cart.quantity - quantity
        })
    }

    return true
}