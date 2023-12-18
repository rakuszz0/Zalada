import db from "@database";
import * as CartDto from "../models/Cart";
import { NotFoundError, ServerError } from "src/config/error";


export async function DBAddProductToCart(params: CartDto.AddProductToCartParams) {
  const addProductToCart = await db.query("INSERT INTO carts (product_id, quantity, customer_id) VALUES (?, ?, ?)", [params.product_id, params.quantity, params.userid]);
  
  if (addProductToCart.affectedRows < 1) {
    throw new ServerError("FAILED_ADD_PRODUCT_TO_CART")
  }

  return addProductToCart
}