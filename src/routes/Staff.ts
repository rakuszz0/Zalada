import { FastifyInstance, RouteOptions } from "fastify";
import * as Auth from "src/config/auth";
import { ListRules } from "src/config/rules";
import * as StaffController from "src/controller/StaffController";
import { productSchema } from "src/services/models/Product";
import { userSchema } from "src/services/models/User";
import { transactionSchema } from "src/services/models/Transaction";
import fastifyMulter from "fastify-multer"

const upload = fastifyMulter({ dest: "uploads" })

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
    url: "/orders/shipping",
    schema: {
      tags: ["Staff Services"],
      summary: "Staff & Admin Change Delivery Status",
      body: transactionSchema("changeDeliveryStatusRequest"),
      security: [
        {
          authorization: []
        }
      ],
      response: {
        200: transactionSchema("changeDeliveryStatusResponse")
      }
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_HANDLE_SHIPPING),
    handler: StaffController.changeDeliveryStatusHandler
  },
  {
    method: ["POST"],
    url: "/orders/delivery",
    schema: {
      tags: ["Staff Services"],
      summary: "Staff & Admin Set Order Delivery",
      security: [
        {
          authorization: []
        }
      ],
      body: transactionSchema("setDeliveryRequest"),
      response: {
        200: transactionSchema("setDeliveryResponse")
      }
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_EDIT_PRODUCT),
    handler: StaffController.setDeliveryHandler
  },
  {
    method: ["POST"],
    url: "/orders/arrived",
    schema: {
      tags: ["Staff Services"],
      summary: "Staff & Admin Set Order Arrived",
      consumes: ["multipart/form-data"],
      produces: ['application/json'],
      body: {
        type: "object",
        properties: {
          attachment: {
            isFile: true,
          },
          order_no: {
            type: "string"
          }
        },
      },
      security: [
        {
          authorization: []
        }
      ],
      response: {
        200: transactionSchema("setArrivedResponse")
      }
    },
    preValidation: upload.single("attachment"),
    preHandler: Auth.CheckRules(ListRules.ACCESS_HANDLE_SHIPPING),
    handler: StaffController.setArrivedHandler
  },
  {
    method: ["POST"],
    url: "/orders/confirm",
    schema: {
      tags: ["Staff Services"],
      summary: "Staff & Admin Confirm Orders",
      security: [
        {
          authorization: []
        }
      ],
      body: transactionSchema("confirmOrderRequest"),
      response: {
        200: transactionSchema("confirmOrderResponse")
      }
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_HANDLE_TRANSACTION),
    handler: StaffController.confirmOrderHandler
  },
  {
    method: ["POST"],
    url: "/edit-users",
    schema: {
      tags: ["Staff Services"],
      security: [
        {
          authorization: []
        }
      ],
      summary: "Staff & Admin Edit Users",
      body: userSchema("editUserRequest"),
      response: {
        200: userSchema("editUserResponse")
      }
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_EDIT_USER),
    handler: StaffController.editUserHandler
  },
];

export default async function StaffRoutes(server: FastifyInstance) {
  server.addHook("preHandler", Auth.CheckAuth)
  for (const route of routes) {
    server.route({ ...route })
  }
}