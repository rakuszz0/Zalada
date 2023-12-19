import { FastifyInstance, RouteOptions } from "fastify";
import * as Auth from "src/config/auth";
import { ListRules } from "src/config/rules";
import * as StaffController from "src/controller/StaffController";
import { productSchema } from "src/services/models/Product";
import { transactionSchema } from "src/services/models/Transaction";


const routes: RouteOptions[] = [
  {
    method: ["GET"],
    url: "/staff/test",
    schema: {
      tags: ["Staff Services"],
      security: [
        {
          authorization: []
        }
      ]
    },
    handler: (request, reply) => reply.send("Hello In Staff"),
  },
  {
    method: ["GET"],
    url: "/staff",
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      tags: ["Staff Services"],
    },
    handler: StaffController.getStaffsHandler,
  },
  {
    method: ["PUT"],
    url: "/products",
    schema: {
      tags: ["Staff Services"],
      security: [
        {
          authorization: []
        }
      ],
      body: productSchema("updateProductRequest"),
      response: {
        200: productSchema("updateProductResponse")
      }
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_EDIT_PRODUCT),
    handler: StaffController.updateProductHandler
  },
  {
    method: ["POST"],
    url: "/orders/delivery",
    schema: {
      tags: ["Staff & Admin Services"],
      summary: "Change Delivery Status",
      body: transactionSchema("changeDeliveryStatusRequest"),
      security: [
        {
          authorization: []
        }
      ],
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_HANDLE_SHIPPING),
    handler: StaffController.changeDeliveryStatusHandler
  }
];

export default async function StaffRoutes(server: FastifyInstance) {
  server.addHook("preHandler", Auth.CheckAuth)
  for (const route of routes) {
    server.route({ ...route })
  }
}