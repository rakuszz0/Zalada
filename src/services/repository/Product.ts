import db from "@database";

export async function DBGetProducts() {
  const product = await db.query("SELECT * FROM products");
  return product;
}
