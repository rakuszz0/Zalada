import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fp from "fastify-plugin"
import { userSchemas } from "../services/models/User"
import { productSchemas } from "src/services/models/Product"


export default fp(async (server) => {
    for (const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema)
    }

    await server.register(fastifySwagger, {
        swagger: {
            info: {
                title: "Zalada APIs",
                description: "API for alls",
                version: "1.0.0",
            }
        }
    })

    await server.register(fastifySwaggerUi, {
        routePrefix: "/docs",
        staticCSP: true,
        uiConfig: {
            persistAuthorization: true
        },
    })
})