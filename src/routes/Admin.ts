import { FastifyInstance, RouteOptions } from "fastify";
import { Hello } from "../services/controller/AdminController";
import { userSchema } from "../services/models/User";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/",
        schema: {
            tags: ["Admin Services"],
            response: {
                200: userSchema("helloSchema")
            }
        },
        handler: Hello
    }
]

export default async function AdminRoutes(server: FastifyInstance) {
    for (const route of routes) {
        server.route({ ...route })
    }
}