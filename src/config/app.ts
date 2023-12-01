import * as z from 'zod'

export const envSchema = z.object({
    NODE_ENV: z.enum(["production", "development", "testing"]),
    DB_HOST: z.string(),
    DB_PASSWORD: z.string(),
    DB_USERNAME: z.string(),
    DB_NAME: z.string()
})


type EnvSchema = z.infer<typeof envSchema>


declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvSchema { }
    }
}