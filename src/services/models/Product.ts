import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const baseSchema = {
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  created_at: z.date(),
  store_id: z.number()
}

const getProductRequest = z.object({
  product_id: z.number(),
});

const getProductResponse = z.object({...baseSchema})

const getProductsResponse = z.array(getProductResponse)

export type GetProductRequest = z.infer<typeof getProductRequest>

export type GetProductResponse = z.infer<typeof getProductResponse>

export const { schemas: productSchemas, $ref: productSchema } = buildJsonSchemas(
    {
      getProductRequest,
      getProductResponse,
      getProductsResponse,
    },
    {
      $id: "productSchema",
    }
  );
