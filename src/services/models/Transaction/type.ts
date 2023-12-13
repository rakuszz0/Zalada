import { customerOrderHistoryByDeliveryStatusParams, customerOrderHistoryByDeliveryStatusRequest, customerOrderHistoryByDeliveryStatusResponse } from "./schema";
import * as z from "zod";

export type CustomerOrderHistoryByDeliveryStatusRequest = z.infer<typeof customerOrderHistoryByDeliveryStatusRequest>
export type CustomerOrderHistoryByDeliveryStatusParams = z.infer<typeof customerOrderHistoryByDeliveryStatusParams>
export type CustomerOrderHistoryByDeliveryStatusResponse = z.infer<typeof customerOrderHistoryByDeliveryStatusResponse>;