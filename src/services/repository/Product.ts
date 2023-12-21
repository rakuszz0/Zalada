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