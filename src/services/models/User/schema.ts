import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const helloSchema = z.object({
  message: z.string(),
});

const addProductsSchema = z.object({
  name:z.string(),
  stock:z.number(),
  description:z.string(),
  price:z.number()
})


export const loginRequest = z.object({
  email: z.string().email(),
  password: z.string()
})

export const { schemas: userSchemas, $ref: userSchema } = buildJsonSchemas(
  {
    helloSchema,
    loginRequest,
    addProductsSchema,
  },
  {
    $id: "userSchema",
  }
);
