import fastifyPlugin from 'fastify-plugin'
import AdminRoutes from '@routes/http/Admin'
import ConsumerRoutes from '@routes/http/Consumer'
import StaffRoutes from '@routes/http/Staff'
import fastifyHelmet from "@fastify/helmet";
import fastifyFormBody from "@fastify/formbody";
import fastifyMulter from "fastify-multer";
import { File, FilesObject } from 'fastify-multer/lib/interfaces';
import fastifyStatic from '@fastify/static';
import path from 'path';

export default fastifyPlugin(async (server, options) => {

    await server.register(fastifyStatic, {
        root: path.join(__dirname, '../../uploads'),
        prefix: "/public",
        list: {
            format: "json",
            jsonFormat: "extended"
        },

    })

    await server.register(fastifyFormBody)
    await server.register(fastifyHelmet)
    await server.register(fastifyMulter.contentParser)
    await server.register(ConsumerRoutes, options)
    await server.register(StaffRoutes, options)
    await server.register(AdminRoutes, options)
})

declare module "fastify" {
    interface FastifyRequest {
        file: Required<File>
        files: FilesObject
    }
}   