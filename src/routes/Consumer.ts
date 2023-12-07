import { FastifyInstance, RouteOptions } from "fastify";
import * as ConsumerController from "src/controller/ConsumerController";
import { userSchema } from "src/services/models/User";
import { productSchema } from "src/services/models/Product";

const routes: RouteOptions[] = [
  {
    method: ["GET"],
    url: "/consumer/test",
    schema: {
      tags: ["Consumer Services"],
    },
    handler: (request, reply) => reply.send("Hello In Consumer"),
  },
  {
    method: ["GET"],
    url: "/products",
    schema: {
        tags: ["Consumer Services"],
        response: {
          200: productSchema("getProductsResponse")
        }
    },
    handler: ConsumerController.getProductHandler,
  },
  {
    method: ["POST"],
    url: "/login",
    schema: {
      tags: ["Consumer Services"],
      body: userSchema("loginRequest")
    },
    handler: ConsumerController.loginHandler
  },
  {
    method: ["POST"],
    url: "/register",
    schema: {
      tags: ["Consumer Services"],
      security : [{
        authorization: []
      }],
      body: userSchema("registerRequest"),
      response: {
        200 : userSchema("registerResponse")
      }
    },
    handler: ConsumerController.registerHandler
  }
];

export default async function ConsumerRoutes(server: FastifyInstance) {
  for (const route of routes) {
    server.route({ ...route });
  }
}
