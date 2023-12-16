import * as CartDto from "src/services/models/Cart";
import * as CartRepository from "src/services/repository/Cart";


export async function AddProductToCartDomain(params: CartDto.AddProductToCartParams) {    
    return await CartRepository.DBAddProductToCart(params)
}