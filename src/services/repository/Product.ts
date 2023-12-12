import db from "@database";
import * as ProductDto from "../models/Product";
import { QueryRunner } from "typeorm";
import { ResultSetHeader } from "mysql2";

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

export async function DBCheckProductExist(product_id: number) {
  const query = await db.query<ProductDto.GetProductQueryResult[]>("SELECT * FROM products WHERE id = ?", [product_id])
  return query
}


export async function DBUpdateProduct({ description, name, price, stock, product_id }: ProductDto.UpdateProductQueryParams, queryRunner?: QueryRunner) {
  const values = [name, stock, description, price, product_id]
  const query = await db.query<ResultSetHeader>("UPDATE products SET name = ?, stock = ?, description = ?, price = ? WHERE id = ?", values, queryRunner)
  return query
}