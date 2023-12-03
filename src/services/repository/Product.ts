import db from "@database";
import { Product } from "@entities";

export async function DBGetProducts() {
  const product = await db.query<Product[]>("SELECT * FROM products");
  return product;
}
