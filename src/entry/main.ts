import "dotenv/config"
import fastify from 'fastify'
import DatabaseService from '@infrastructure/database'
import SwaggerService from '@infrastructure/swagger'
import RoutesService from "@infrastructure/routes"

import { ajvFilePlugin } from "src/utils/ajv"
import { ZodError } from "zod"
import cron from "src/cron"
import AMQPService from "@infrastructure/amqp"
import { mainAppSchema } from "src/config/app"
import logger from "src/utils/logger"

const server = fastify({ ajv: { plugins: [ajvFilePlugin] } })

async function main() {
    try {
        // Env Validation
        await mainAppSchema.parseAsync(process.env)

        await AMQPService.createSingleQueueProducer({
            vhost: process.env.AMQP_VHOST,
            hostname: process.env.AMQP_HOST,
            username: process.env.AMQP_USERNAME,
            password: process.env.AMQP_PASSWORD,
            queue: 'zalada-mail',
            serviceName: 'zalada-mail',
            protocol: 'amqp'
        })

        await server.register(SwaggerService)

        // Register all routes
        await server.register(RoutesService)

        // Initialize database service
        await DatabaseService.init()

        await server.ready()

        await cron()

        const url = await server.listen({ port: process.env.NODE_PORT, host: process.env.NODE_HOST })

        logger.info({ message: `server running at ${url}` })
    } catch (error) {
        if (error instanceof ZodError) {
            logger.error({ message: error.issues })
        } else {
            logger.error({ message: error })
        }

        process.exit(1)
    }

}

main()