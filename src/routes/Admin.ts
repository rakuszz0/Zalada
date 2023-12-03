import { FastifyInstance, RouteOptions } from "fastify";
import * as AdminController from "../controller/AdminController";
import { userSchema } from "../services/models/User";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/test",
        schema: {
            tags: ["Admin Services"],
            response: {
                200: userSchema("helloSchema")
            }
        },
        handler: AdminController.Hello
    },
    {
        method: ["GET"],
        url: "/users",
        schema: {
            tags: ["Admin Services"]
        },
        handler: AdminController.getUsersHandler
    }
]

export default async function AdminRoutes(server: FastifyInstance) {
    for (const route of routes) {
        server.route({ ...route })
    }
}