import { FastifyInstance, RouteOptions } from "fastify";
import * as ConsumerController from "src/controller/ConsumerController";
import { userSchema } from "src/services/models/User";
import { cartSchema } from "src/services/models/Cart";
import { productSchema } from "src/services/models/Product";
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
    method: ["POST"],
    url: "/register",
    schema: {
      tags: ["Consumer Services"],
      body: userSchema("registerRequest"),
      response: {
        200: userSchema("registerResponse")
      }
    },
    handler: ConsumerController.registerHandler
  },
  {
    method: ["POST"],
    url: "/change-pass",
    schema: {
      tags: ["Consumer Services"],
      body: userSchema("changePassRequest"),
      security:[
        {
          authorization:[]
        }
      ],
      response: {
        200:userSchema("changePassResponse")
      }
    },
    preHandler: Auth.CheckAuth,
    handler: ConsumerController.changePassword
  },
  {
    method: ["POST"],
    url: "/add-product-to-cart",
    schema: {
      tags: ["Consumer Services"],
      body: cartSchema("addProductToCartRequest"),
      security:[
        {
          authorization:[]
        }
      ],
      response: {
        200: cartSchema("addProductToCartResponse")
      }
    },
    preHandler: Auth.CheckAuth,
    handler: ConsumerController.addProductToCart
  }
];

export default async function ConsumerRoutes(server: FastifyInstance) {
  for (const route of routes) {
    server.route({ ...route });
  }
}
