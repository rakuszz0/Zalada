import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const customerOrderHistoryByDeliveryStatusRequest = z.object({
  status: z.string(),
});

const customerOrderHistoryByDeliveryStatusResponse = z.object({
  order_no: z.string(),
  product_id: z.number(),
  quantity: z.number(),
  order_time: z.number(),
  status: z.string(),
  customer_id: z.number(),
  payment_type: z.number()
});


export type CustomerOrderHistoryByDeliveryStatusRequest = z.infer<typeof customerOrderHistoryByDeliveryStatusRequest>
export type CustomerOrderHistoryByDeliveryStatusResponse = z.infer<typeof customerOrderHistoryByDeliveryStatusResponse>;

export const { schemas: transactionSchemas, $ref: transactionSchema } = buildJsonSchemas(
    {
      customerOrderHistoryByDeliveryStatusRequest,
      customerOrderHistoryByDeliveryStatusResponse
    },
    {
      $id: "transactionSchema",
    }
  );