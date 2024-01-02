import db from "@database";
import * as ProductDto from "../models/Product";
import { ResultSetHeader } from "mysql2";
import { QueryRunner } from "typeorm";
import { NotFoundError, RequestError, ServerError } from "../models/Common";

export async function DBGetProducts({limit = 500, search = "1=1", sort = "DESC", filter = "1=1"}: ProductDto.GetProductsQueryParams) {
  return await db.query<ProductDto.GetProductsQueryResult[]>(`SELECT p.id, p.name, IFNULL(CAST(SUM(o.quantity) as float), 0) total_sale, p.description, p.stock, p.price, IFNULL(CAST(AVG(re.rating) AS DECIMAL(10,1)), 0) ratings FROM products p LEFT JOIN orders o ON o.product_id = p.id LEFT JOIN reviews re ON re.product_id = p.id WHERE ${search} GROUP BY p.id HAVING ${filter} ORDER BY p.id ${sort} LIMIT ${limit + 1}`);
}

export async function DBAddProductByAdmin(params: ProductDto.AddProductByAdmin  ) {
  const {name,stock,description,price} = params
  const query = await db.query<ProductDto.AddProductByAdmin[]>(
    "INSERT INTO products( name, stock, description, price,store_id ) VALUES (?,?,?,?,1)",[name,stock,description,price]
  )

  return query
}

export async function DBCheckProductExist(product_id: number, options?: { lock: boolean }) {
  let sql = `SELECT * FROM products WHERE id = ?`
  
  if(options?.lock) {
    sql += " FOR UPDATE"
  }
  
  const query = await db.query<ProductDto.GetProductQueryResult[]>(sql, [product_id])

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

export async function DBInsertToTrashedProduct({name, description, price, product_id,store_id}:ProductDto.InsertProductTrashResult,queryRunner:QueryRunner){
  const values = [product_id,name, description, price,store_id]
  const query = await db.query<ResultSetHeader>(
    "INSERT INTO trash_products(id,name,description,price,store_id) VALUES (?) ",[values],queryRunner
  )

  if(query.affectedRows < 1) {
    throw new ServerError("FAILED_TO_INSERT_TRASH_PRODUCT")
  } 

  return query
}

export async function DBDeleteProduct(params:ProductDto.DeleteProductQuery,queryRunner:QueryRunner){
  const {product_id} = params 

  const query = await db.query<ResultSetHeader>(
    "DELETE FROM products where id=? ",[product_id],queryRunner
  )

  if(query.affectedRows < 1) {
    throw new ServerError("FAILED_TO_DELETE_PRODUCT")
  } 
  return query
}

export async function DBAddReviewTransaction({customer_id,product_id,rating,message}:ProductDto.AddReviewProductQueryParams){
  const query = await db.query<ResultSetHeader>("INSERT INTO reviews (customer_id, product_id, rating, message) VALUES (?,?,?,?)",[customer_id,product_id,rating,message])
  if(query.affectedRows < 1) {
    throw new ServerError("FAILED_TO_ADD_REVIEW")
  }
  return query
}

export async function DBCheckReviewExist({ order_no, product_id }: ProductDto.CheckReviewExistQueryParams){
  const query = await db.query<ProductDto.ReviewProductExistQueryResult[]>(
  `SELECT a.product_id, a.customer_id, a.rating,a.message
  FROM reviews a
  LEFT JOIN transactions b ON b.customer_id = a.customer_id
  INNER JOIN orders c ON c.order_no = b.order_no 
  WHERE b.order_no = ? c.product_id = ?;
  `,[order_no, product_id])

  if(query.length > 0) {
    throw new RequestError("YOU`VE_REVIEWED")
  }
  return query
}