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
    "SELECT id, name, stock, description, price, store_id FROM products WHERE id = ?",[id]
  )
  if (result.length < 1) {
    throw new NotFoundError("PRODUCT_DATA_NOT_FOUND")
  }
  return result [0]
}