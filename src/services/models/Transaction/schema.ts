import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

export const customerOrderHistoryByDeliveryStatusRequest = z.object({
  status: z.string(),
});

export const customerOrderHistoryByDeliveryStatusResponse = z.object({
  order_no: z.string(),
  product_id: z.number(),
  quantity: z.number(),
  order_time: z.number(),
  status: z.string(),
  customer_id: z.number(),
  payment_type: z.number()
});




export const { schemas: transactionSchemas, $ref: transactionSchema } = buildJsonSchemas(
    {
      customerOrderHistoryByDeliveryStatusRequest,
      customerOrderHistoryByDeliveryStatusResponse
    },
    {
      $id: "transactionSchema",
    }
  );