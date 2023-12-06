import { buildJsonSchemas } from "fastify-zod";
import { type } from "os";
import * as z from "zod";

const getProductRequest = z.object({
  product_id: z.number(),
});

const addProductsRequest = z.object({
  name:z.string(),
  quantity:z.number(),
  description:z.number(),
  price:z.number()
})

export type AddProductsRequest = z.infer<typeof addProductsRequest>

export type GetProductRequest = z.infer<typeof getProductRequest>

export const { schemas: productSchemas, $ref: productSchema } = buildJsonSchemas(
    {
      getProductRequest,
      addProductsRequest,
    },
    {
      $id: "productSchema",
    }
  );
