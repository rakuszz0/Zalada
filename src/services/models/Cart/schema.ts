import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

export const addProductToCartRequest = z.object({
    product_id: z.number(),
    quantity: z.number()
})

export const addProductToCartResponse = z.object({
    message: z.boolean()
  })

export const deleteProductFromCartRequest = z.object({
    quantity: z.number(),
    product_id: z.number()
})

export const deleteProductFromCartResponse = z.object({
    message: z.boolean()
})
export const { schemas: cartSchemas, $ref: cartSchema } = buildJsonSchemas(
    {
        addProductToCartRequest,
        addProductToCartResponse,
        deleteProductFromCartRequest,
        deleteProductFromCartResponse
    },
    {
        $id: "cartSchema",
    }
);
