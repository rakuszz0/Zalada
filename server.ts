import "dotenv/config"
import fastify from 'fastify'
import DatabaseService from './src/infrastructure/database'
import SwaggerService from './src/infrastructure/swagger'
import RoutesService from "./src/infrastructure/routes"
import { envSchema } from "./src/config/app"

const server = fastify({ logger: true })

async function main() {
    // Env Validation
    await envSchema.parseAsync(process.env)

    // Swagger service
    await server.register(SwaggerService)

    // Register all routes
    await server.register(RoutesService)

    // Initialize database service
    await DatabaseService.init()
    await server.listen({ port: 3001 })
}

main()