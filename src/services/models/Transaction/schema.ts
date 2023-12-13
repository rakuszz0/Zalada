import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";


export const customerOrderHistoryByDeliveryStatusRequest = z.object({
  status: z.enum(["0", "1", "2", "3", "4", "5"]).describe("{0:pending, 1:packed, 2:onway, 3:arrived, 4:finished, 5:cancel}").optional()
});

export const customerOrderHistoryByDeliveryStatusParams = z.object({
  userid: z.number(),
  status: z.enum(["0", "1", "2", "3", "4", "5"]).optional()
})


export const customerOrderHistoryByDeliveryStatusResponse = z.object({
  order_no: z.string(),
  product_id: z.number(),
  quantity: z.number(),
  order_time: z.number(),
  status: z.string(),
  customer_id: z.number(),
  payment_type: z.number()
}).array()




export const { schemas: transactionSchemas, $ref: transactionSchema } = buildJsonSchemas(
    {
      customerOrderHistoryByDeliveryStatusRequest,
      customerOrderHistoryByDeliveryStatusParams,
      customerOrderHistoryByDeliveryStatusResponse
    },
    {
      $id: "transactionSchema",
    }
  );