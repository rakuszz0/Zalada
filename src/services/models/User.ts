import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

const helloSchema = z.object({
    message: z.string(),
});

export const { schemas: userSchemas, $ref: userSchema } = buildJsonSchemas(
    {
        helloSchema,
    },
    {
        $id: "userSchema",
    }
);
