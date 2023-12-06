import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const helloSchema = z.object({
  message: z.string(),
});

export const loginRequest = z.object({
  email: z.string().email(),
  password: z.string()
})

export const { schemas: userSchemas, $ref: userSchema } = buildJsonSchemas(
  {
    helloSchema,
    loginRequest

  },
  {
    $id: "userSchema",
  }
);
