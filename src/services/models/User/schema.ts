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

export const createUsers = z.object({
  email: z.string().email(),
  username: z.string(),
  password:z.string().min(6).max(12),
  password_confirmation: z.string().min(6).max(12),
  user_level: z.number()
})
export const createUsersResponse = z.object({
  message: z.boolean()
})

export const changePassRequest = z.object({
  old_password:z.string(),
  new_password: z.string().min(6).max(12),
  password_confirmation: z.string().min(6).max(12),
})

export const changePassResponse = z.object({
  message: z.boolean()
})
export const { schemas: userSchemas, $ref: userSchema } = buildJsonSchemas(
  {
    helloSchema,
    loginRequest,
    addProductsSchema,
    createUsers,
    createUsersResponse,
    changePassRequest,
    changePassResponse,
  },
  {
    $id: "userSchema",
  }
);
