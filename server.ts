import "dotenv/config"
import fastify from 'fastify'
import DatabaseService from '@infrastructure/database'
import MailerService from '@infrastructure/mailer'
import SwaggerService from '@infrastructure/swagger'
import RoutesService from "@infrastructure/routes"
import { envSchema } from "./src/config/app"
import { ajvFilePlugin } from "src/utils/ajv"
import { ZodError } from "zod"
import cron from "src/cron"
import AMQPService from "@infrastructure/amqp"

const server = fastify({ logger: process.env.NODE_ENV == "development" ? true : false, ajv: { plugins: [ajvFilePlugin] } })

async function main() {
    try {
        // Env Validation
        await envSchema.parseAsync(process.env)

        // Register Mail Service
        await MailerService.init()

        await AMQPService.createSingleQueueProducer({
            vhost: process.env.AMQP_VHOST,
            hostname: process.env.AMQP_HOST,
            username: process.env.AMQP_USERNAME,
            password: process.env.AMQP_PASSWORD,
            queue: 'zalada-mail',
            serviceName: 'zalada-mail',
            protocol: 'amqp'
        })

        await AMQPService.publish('zalada-mail', { func: 'SendMail' })

        await server.register(SwaggerService)

        // Register all routes
        await server.register(RoutesService)

        // Initialize database service
        await DatabaseService.init()

        await server.ready()

        await cron()

        await server.listen({ port: process.env.NODE_PORT, host: process.env.NODE_HOST })        
    } catch (error) {
        if(error instanceof ZodError) {
            console.error(error.issues)
        } else {
            const err = error as any
            server.log.error({ name: "SERVER_ERROR", message: `${err.message}` })
        }
        
        process.exit(1)
    }

}

main()