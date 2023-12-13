import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";


export const transactionHistoryRequest = z.object({
  status: z.number().optional()
});

export const productList = z.object({
  product_id: z.number(),
  price: z.number(),
  quantity: z.number()
})

export const transactionHistoryResponse = z.record(z.string(), z.object({
  order_no: z.string(),
  product: z.array(productList),
  order_time: z.string(),
  status: z.number(),
  customer_id: z.number(),
  payment_type: z.number(),
  verified_by: z.number()
}))





export const { schemas: transactionSchemas, $ref: transactionSchema } = buildJsonSchemas(
    {
      transactionHistoryRequest,
      transactionHistoryResponse
    },
    {
      $id: "transactionSchema",
    }
  );