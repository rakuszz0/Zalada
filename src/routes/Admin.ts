import { FastifyInstance, RouteOptions } from "fastify";
import * as AdminController from "../controller/AdminController";
import { userSchema } from "../services/models/User";
import * as Auth from "src/config/auth";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/test",
        schema: {
            tags: ["Admin Services"],
            security: [
                {
                    authorization: []
                }
            ],
            response: {
                200: userSchema("helloSchema")
            }
        },
        preHandler: Auth.CheckRoles([1]),
        handler: AdminController.Hello
    },
    {
        method: ["GET"],
        url: "/users",
        schema: {
            tags: ["Admin Services"],
            security: [
                {
                    authorization: []
                }
            ]
        },
        handler: AdminController.getUsersHandler
    },
    {
        method: ["POST"],
        url: "/add-products",
        schema: {
            tags: ["Admin Services"],
            security:[
                {
                    authorization: []
                }
            ],
            body: userSchema("addProductsSchema")
        },
        handler: AdminController.addProductsHandler
    },
    {
        method: ["POST"],
        url: "/add-users",
        schema: {
            tags: ["Admin Services"],
            security:[
                {
                    authorization: []
                }
            ],
            body: userSchema("createUsers"),
            response: {
                200: userSchema("createUsers")
              }
        },
        preHandler: Auth.CheckRoles([1]),
        handler: AdminController.createUserByAdmin
    }
]

export default async function AdminRoutes(server: FastifyInstance) {
    server.addHook("preHandler", Auth.CheckAuth)
    for (const route of routes) {
        server.route({ ...route })
    }
}