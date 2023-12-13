import db from "@database";
import * as CartDto from "../models/Cart";


export async function DBAddProductToCart(params: CartDto.AddProductToCartParams) {
  const product = await db.query("INSERT INTO carts (product_id, quantity, customer_id) VALUES (?, ?, ?)", [params.product_id, params.quantity, params.userid]);
  return product;
}