import { FastifyInstance, RouteOptions } from "fastify";
import * as ConsumerController from "src/controller/ConsumerController";
import { userSchema } from "src/services/models/User";
import { productSchema } from "src/services/models/Product";
import { transactionSchema } from "src/services/models/Transaction";
import * as Auth from "src/config/auth";

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
    method: ["GET"],
    url: "/orders/:order_no",
    schema: {
      tags: ["Consumer Services"],
      security: [
        {
          authorization: []
        }
      ],
      params: {
        type: "object",
        properties: {
          order_no: {
            type: "string"
          }
        }
      },
      response: {
        200: transactionSchema("getOrderDetailsResponse")
      }
    },
    preHandler: Auth.CheckAuth,
    handler: ConsumerController.getOrderDetailsHandler
  }
];

export default async function ConsumerRoutes(server: FastifyInstance) {
  for (const route of routes) {
    server.route({ ...route });
  }
}
