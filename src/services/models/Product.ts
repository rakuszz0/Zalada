import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const getProductRequest = z.object({
  product_id: z.number(),
});


export type GetProductRequest = z.infer<typeof getProductRequest>

export const { schemas: productSchemas, $ref: productSchema } = buildJsonSchemas(
    {
      getProductRequest,
    },
    {
      $id: "productSchema",
    }
  );
