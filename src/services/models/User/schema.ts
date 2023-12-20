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
  first_name: z.string(),
  last_name: z.string(),
  password: z.string().min(6).max(12),
  password_confirmation: z.string().min(6).max(12),
  phone_number: z.string().min(10).max(15).regex(/^[0-9]+$/),
  address: z.string()
})

export const registerResponse = z.object({
  message: z.boolean()
})

export const createUsers = z.object({
  email: z.string().email(),
  first_name:z.string(),
  last_name:z.string(),
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

export const getRolesListResponse = z.object({
  message: z.object({
    id: z.number(),
    name: z.string()
  }).array()
})

export const getRulesListResponse = z.object({
  message: z.object({
    id: z.number(),
    name: z.string()
  }).array()
})

export const createGroupRules = z.object({
  rules: z.union([z.number(), z.number().array()]),
  role_id: z.number()
})

export const createGroupRulesResponse = z.object({
  message: z.boolean()
})

export const editUserRequest = z.object({
  id:z.number(),
  email: z.string().email(),
  first_name:z.string(),
  last_name: z.string(),
  username: z.string(),
  user_level: z.number(),
  phone_number:z.string(),
  address:z.string(),
})

export const editUserResponse = z.object({ message: z.boolean()})


export const restoreTrashedUser = z.object({
  id:z.number()
})

export const restoreTrashedUserResponse = z.object({
  message: z.boolean()
})

export const { schemas: userSchemas, $ref: userSchema } = buildJsonSchemas(
  {
    helloSchema,
    loginRequest,
    addProductsSchema,
    registerRequest,
    registerResponse,
    createUsers,
    createUsersResponse,
    changePassRequest,
    changePassResponse,
    createGroupRules,
    createGroupRulesResponse,
    getRolesListResponse,
    getRulesListResponse,
    editUserRequest,
    editUserResponse,
    restoreTrashedUser,
    restoreTrashedUserResponse
  },
  {
    $id: "userSchema",
  }
);
