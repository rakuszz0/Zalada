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

export const registerRequest = z.object({
  username: z.string().min(2).max(50).regex(/^[a-zA-Z ]+$/),
  email: z.string().email(),
  password: z.string().min(6).max(12),
  password_confirmation: z.string().min(6).max(12),
  phone_number: z.string().min(10).max(15).regex(/^[0-9]+$/),
  address: z.string()
})

export const registerResponse = z.object({
  message: z.boolean()
})

export const { schemas: userSchemas, $ref: userSchema } = buildJsonSchemas(
  {
    helloSchema,
    loginRequest,
    addProductsSchema,
    registerRequest,
    registerResponse
  },
  {
    $id: "userSchema",
  }
);
