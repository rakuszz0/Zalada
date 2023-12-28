import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const helloSchema = z.object({
  message: z.string(),
});

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


export const deleteUserRequest = z.object({
  email:z.string()
})

export const deleteUserResponse = z.object({
  message:z.boolean()
})

export const getUserListRequest = z.object({
  limit: z.number().min(1).optional(),
  sort: z.enum(["DESC", "ASC"]).optional(),
  lastId: z.number().optional(),
  search: z.string().optional().describe(JSON.stringify({ user_id: "number", username: "string", email: "string", firstname: "string", lastname: "string", registered_date: "date", user_level: "number" })),
})

export const createRulesRequest = z.object({
  rules_id: z.number(),
  rules_name: z.string()
})

export const createRulesResponse = z.object({
  message: z.boolean()
})

export const revokeGroupRulesRequest = z.object({
  role_id: z.number(),
  rules_id: z.number()
})

export const revokeGroupRulesResponse = z.object({
  message: z.boolean()
})

export const { schemas: userSchemas, $ref: userSchema } = buildJsonSchemas(
  {
    helloSchema,
    loginRequest,
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
    restoreTrashedUserResponse,
    deleteUserRequest,
    deleteUserResponse,
    getUserListRequest,
    createRulesRequest,
    createRulesResponse,
    revokeGroupRulesRequest,
    revokeGroupRulesResponse
  },
  {
    $id: "userSchema",
  }
);
