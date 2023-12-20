import db from "@database";
import * as ProductDto from "../models/Product";
import { NotFoundError, ServerError } from "src/config/error";


export async function DBGetProducts() {
  const product = await db.query<ProductDto.GetProductsQueryResult>("SELECT * FROM products");
  return product;
}

export async function DBAddProductByAdmin(params: ProductDto.AddProductByAdmin  ) {
  const {name,stock,description,price} = params
  const query = await db.query<ProductDto.AddProductByAdmin[]>(
    "INSERT INTO products( name, stock, description, price,store_id ) VALUES (?,?,?,?,1)",[name,stock,description,price]
  )

  return query
}

export async function DBGetProductsDetails(id:number) {
  const result = await db.query<ProductDto.GetProductDetailsQueryResult[]>(
    `SELECT a.id, a.name, a.stock, a.description, a.price, a.store_id, b.id, b.customer_id, b.rating,
     b.product_id, b.message, b.created_at FROM products a
     LEFT JOIN reviews b ON a.id = b.product_id
     WHERE a.id = ?`,[id]
  )
  if (result.length < 1) {
    throw new NotFoundError("PRODUCT_DATA_NOT_FOUND")
  }
  return result [0]
}