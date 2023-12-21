import db from "@database";
import * as ProductDto from "../models/Product";
import { ResultSetHeader } from "mysql2";
import { QueryRunner } from "typeorm";
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

export async function DBCheckProductExist(product_id: number) {
  const query = await db.query<ProductDto.GetProductQueryResult[]>("SELECT * FROM products WHERE id = ?", [product_id])

  if(query.length < 1) {
    throw new NotFoundError("PRODUCT_NOT_FOUND")
  }

  return query[0]
}


export async function DBUpdateProduct({ description, name, price, stock, product_id }: ProductDto.UpdateProductQueryParams, queryRunner?: QueryRunner) {
  const values = [name, stock, description, price, product_id]
  const query = await db.query<ResultSetHeader>("UPDATE products SET name = ?, stock = ?, description = ?, price = ? WHERE id = ?", values, queryRunner)

  if(query.affectedRows < 1) {
    throw new NotFoundError("FAILED_UPDATE_PRODUCT")
  }

  return query
}


export async function DBUpdateStockProduct({product_id, stock}: ProductDto.UpdateStockQueryParams, queryRunner?: QueryRunner) {
  const query = await db.query<ResultSetHeader>("UPDATE products SET stock = ? WHERE id = ? ", [stock, product_id], queryRunner)

  if(query.affectedRows < 1) {
    throw new ServerError("FAILED_TO_UPDATE_STOCK")
  }

  return query
}

export async function DBGetProductsDetails(id:number) {
  const result = await db.query<ProductDto.GetProductDetailsQueryResult[]>(
    `SELECT a.id, a.name, a.stock, a.description, a.price, b.created_at,
    ifnull(AVG(b.rating),0) AS average_rating, ifnull(SUM(c.quantity),0) AS total_sell
    FROM products a
    LEFT JOIN reviews b ON a.id = b.product_id
    left JOIN orders c ON c.product_id = a.id
    LEFT JOIN transactions d ON c.order_no = d.order_no
    WHERE a.id = ? AND d.status = 6 order BY a.id
  `,[id]
  )
  if (result.length < 1) {
    throw new NotFoundError("PRODUCT_DATA_NOT_FOUND")
  }
  return result [0]
}

export async function DBProductReviews(product_id:number){
  const query = await db.query<ProductDto.ProductReviews>(
    `SELECT a.rating, a.message, b.username
    FROM reviews a
    LEFT JOIN users b ON a.customer_id = b.id
    WHERE a.product_id = ?`,[product_id]
  )
  return query
}