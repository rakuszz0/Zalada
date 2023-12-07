import db from "@database";
import * as ProductDto from "../models/Product";
import { QueryRunner, UpdateResult } from "typeorm";
import { ResultSetHeader } from "mysql2";

export async function DBGetProducts() {
  const product = await db.query<ProductDto.GetProductsQueryResult>("SELECT * FROM products");
  return product;
}

export async function DBCheckProductExist(product_id: number) {
  const query = await db.query<ProductDto.GetProductQueryResult[]>("SELECT * FROM products WHERE id = ?", [product_id])
  return query[0]
}


export async function DBUpdateStockProduct({product_id, stock}: ProductDto.UpdateStockQueryParams, queryRunner?: QueryRunner) {
  const query = await db.query<ResultSetHeader>("UPDATE products SET stock = ? WHERE id = ? ", [stock, product_id], queryRunner)
  return query
}