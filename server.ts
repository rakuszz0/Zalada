import "dotenv/config"
import fastify from 'fastify'
import DatabaseService from '@infrastructure/database'
import MailerService from '@infrastructure/mailer'
import SwaggerService from '@infrastructure/swagger'
import RoutesService from "@infrastructure/routes"
import { envSchema } from "./src/config/app"
import { signToken, verifyToken } from "src/utils/jwt"

const server = fastify({ logger: process.env.NODE_ENV == "development" ? true : false })

async function main() {
    // Env Validation
    await envSchema.parseAsync(process.env)

    // Register Mail Service
    await MailerService.init()

    await server.register(SwaggerService)
    
    // Register all routes
    await server.register(RoutesService)

    // Initialize database service
    await DatabaseService.init()
    await server.listen({ port: 3001 })
}

main()