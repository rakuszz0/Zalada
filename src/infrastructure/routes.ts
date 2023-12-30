import fastifyPlugin from 'fastify-plugin'
import AdminRoutes from '../routes/Admin'
import ConsumerRoutes from '../routes/Consumer'
import StaffRoutes from '../routes/Staff'
import fastifyHelmet from "@fastify/helmet";
import fastifyFormBody from "@fastify/formbody";
import fastifyMulter from "fastify-multer";
import { File, FilesObject } from 'fastify-multer/lib/interfaces';

export default fastifyPlugin(async (server) => {
    await server.register(fastifyFormBody)
    await server.register(fastifyHelmet) 
    await server.register(fastifyMulter.contentParser)
    await server.register(ConsumerRoutes, { prefix: "/api/v1" })
    await server.register(StaffRoutes, { prefix: "/api/v1" })
    await server.register(AdminRoutes, { prefix: "/api/v1" }) 
})

declare module "fastify" {
    interface FastifyRequest {
        file: Required<File>
        files: FilesObject
    }
}