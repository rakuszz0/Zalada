import db from "@database";
import * as ProductDto from "../models/Product";

export async function DBGetProducts() {
  const product = await db.query<ProductDto.GetProductResponse[]>("SELECT * FROM products");
  return product;
}
