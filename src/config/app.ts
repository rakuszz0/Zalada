import * as z from 'zod'

const mailDto = {
    AMQP_USERNAME: z.string(),
    AMQP_PASSWORD: z.string(),
    AMQP_HOST: z.string(),
    AMQP_PORT: z.preprocess(data => parseInt(data as string), z.number()),
}

export const envSchema = z.object({
    NODE_ENV: z.enum(["production", "development", "testing"]),
    NODE_HOST: z.string(),
    DB_HOST: z.string(),
    DB_PASSWORD: z.string(),
    DB_USERNAME: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.preprocess(v => parseInt(v as string), z.number()),
    JWT_SECRET_KEY: z.string(),
    MAILER_PASSWORD: z.string(),
    MAILER_HOST: z.string(),
    MAILER_USER: z.string(),
    MAILER_PORT: z.preprocess(data => parseInt(data as string), z.number()),
    NODE_PORT: z.preprocess(port => parseInt(port as string), z.number()),
    PENDING_ORDER_MAX_TIME: z.preprocess(data => parseInt(data as string), z.number()),
    LOW_STOCK_TRESHOLD: z.preprocess(data => parseInt(data as string), z.number()),
    AMQP_VHOST: z.string(),
    AMQP_USERNAME: z.string(),
    AMQP_PASSWORD: z.string(),
    AMQP_HOST: z.string(),
    AMQP_PORT: z.preprocess(data => parseInt(data as string), z.number()),
})

export const mailEnvSchema = z.object({
    ...mailDto
})


type EnvSchema = z.infer<typeof envSchema>

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvSchema { }
    }
}