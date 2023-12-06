import "dotenv/config"
import fastify from 'fastify'
import DatabaseService from '@infrastructure/database'
import SwaggerService from '@infrastructure/swagger'
import RoutesService from "@infrastructure/routes"
import { envSchema } from "./src/config/app"
import { signToken, verifyToken } from "src/utils/jwt"

const server = fastify({ logger: process.env.NODE_ENV == "development" ? true : false })

async function main() {
    // Env Validation
    await envSchema.parseAsync(process.env)

    await server.register(SwaggerService)

    const token = await signToken({user_id: 2, user_level: 2}, process.env.JWT_SECRET_KEY, "1h")
console.log(token)

    const decode = await verifyToken(token, process.env.JWT_SECRET_KEY)
    console.log(decode)
    // Register all routes
    await server.register(RoutesService)

    // Initialize database service
    await DatabaseService.init()
    await server.listen({ port: 3001 })
}

main()