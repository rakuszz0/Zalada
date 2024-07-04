import "dotenv/config"
import fastify from 'fastify'
import { ZodError } from "zod"

import SwaggerService from '@infrastructure/Main/swagger'
import RoutesService from "@infrastructure/Main/routes"
import { ajvFilePlugin } from "src/utils/ajv"
import CronService from "src/cron"
import { InfraAMQP, InfraDB, InfraWS } from "@infrastructure/Common"
import { mainAppSchema } from "src/config/app"
import logger from "src/utils/logger"
import { Server } from "socket.io"

const server = fastify({ ajv: { plugins: [ajvFilePlugin] } })

async function main() {
    try {
        // Env Validation
        await mainAppSchema.parseAsync(process.env)

        await InfraAMQP.createSingleQueueProducer({
            vhost: process.env.AMQP_VHOST,
            hostname: process.env.AMQP_HOST,
            username: process.env.AMQP_USERNAME,
            password: process.env.AMQP_PASSWORD,
            queue: 'zalada-mail',
            serviceName: 'zalada-mail',
            protocol: 'amqp'
        })

        // Initialize database service
        await InfraDB.init()

        const io = new Server(server.server, {
            cors: {
                origin: "*"
            }
        })


        server.decorate('io', io)


        server.io.on('connection', (data) => {
            logger.info({ message: "new connected client", data })            
        })

        await server.register(SwaggerService)

        // Register all routes
        await server.register(RoutesService)

        await server.ready()

        await CronService()

        const url = await server.listen({ port: process.env.NODE_PORT, host: process.env.NODE_HOST })

        logger.info({ message: `server running at ${url}` })
    } catch (error) {
        if (error instanceof ZodError) {
            const err = error.issues[0]
            console.error({ message: `${err.code} ${err.path[0]}` })
        } else {
            const message = JSON.stringify(error)
            console.error({ message })
        }

        process.exit(1)
    }

}

main()


declare module "fastify" {
    interface FastifyInstance {
        io: Server
    }
}