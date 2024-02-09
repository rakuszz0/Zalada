import db from "@database";
import * as CartDto from "../models/Cart";
import { NotFoundError, ServerError } from "../models/Common";
import { ResultSetHeader } from "mysql2";


export async function DBAddProductToCart(params: CartDto.AddProductToCartParams) {
  const addProductToCart = await db.query("INSERT INTO carts (product_id, quantity, customer_id) VALUES (?, ?, ?)", [params.product_id, params.quantity, params.userid]);
  
  if (addProductToCart.affectedRows < 1) {
    throw new ServerError("FAILED_ADD_PRODUCT_TO_CART")
  }

  return addProductToCart
}

export async function DBDeleteProductFromCart(params: CartDto.DeleteProductFromCartQueryParams) {
  const deleteProductFromCart = await db.query("DELETE FROM carts WHERE product_id = ? AND customer_id = ?", [params.product_id, params.userid]);
  
  if (deleteProductFromCart.affectedRows < 1) {
    throw new ServerError("FAILED_DELETE_PRODUCT_FROM_CART")
  }

  return deleteProductFromCart
}

export async function DBUpdateProductCart({ customer_id, product_id, quantity }: CartDto.UpdateProductCartParams) {
  const query = await db.query<ResultSetHeader>(`UPDATE carts SET quantity = ? WHERE product_id = ? AND customer_id = ?`, [quantity, product_id, customer_id])

  if(query.affectedRows < 1) {
    throw new ServerError("FAILED_TO_UPDATE_PRODUCT_CART")
  }

  return query
}

export async function DBCheckProductFromCart({ product_id, customer_id }: CartDto.CheckProductFromCartParams) {
  const query = await db.query<CartDto.CheckProductFromCartQueryResult[]>(`SELECT * FROM carts WHERE product_id = ? AND customer_id = ?`, [product_id, customer_id])

  if(query.length < 1) {
    throw new NotFoundError("PRODUCT_NOT_FOUND")
  }

  return query[0]
}

export async function DBFindProductFromCart({ product_id, customer_id }: CartDto.CheckProductFromCartParams) {
  const query = await db.query<CartDto.CheckProductFromCartQueryResult[]>(`SELECT * FROM carts WHERE product_id = ? AND customer_id = ?`, [product_id, customer_id])

  return query[0]
}