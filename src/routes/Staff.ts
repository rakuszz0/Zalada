import { FastifyInstance, RouteOptions } from "fastify";
import * as Auth from "src/config/auth";
import { ListRules } from "src/config/rules";
import * as StaffController from "src/controller/StaffController";
import { productSchema } from "src/services/models/Product";
import { transactionSchema } from "src/services/models/Transaction";
import fastifyMulter from "fastify-multer"
import { userSchema } from "src/services/models/User";
import { baseResponse, commonSchema } from "src/services/models/Common";
import * as Log from "src/config/log";

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
      summary: "Staff & Admin Edit Products",
      security: [
        {
          authorization: []
        }
      ],
      body: productSchema("updateProductRequest"),
      response: baseResponse({
        schema: productSchema("updateProductResponse")
      })
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_EDIT_PRODUCT),
    handler: StaffController.updateProductHandler
  },
  {
    method: ["POST"],
    url: "/transaction/list",
    schema: {
      tags: ["Staff Services"],
      summary: "Staff & Admin Get Transaction List",
      security: [
        {
          authorization: []
        }
      ],
      body: transactionSchema("getTransactionListRequest"),
      response: baseResponse({
        schema: commonSchema("paginationResponse")
      })
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_HANDLE_TRANSACTION),
    handler: StaffController.transactionListHandler
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
      response: baseResponse({
        schema: transactionSchema("changeDeliveryStatusResponse")
      })
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
      response: baseResponse({
        schema: transactionSchema("setDeliveryResponse")
      })
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
            isFile: true
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
      response: baseResponse({
        schema: transactionSchema("setArrivedResponse")
      })
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
      response: baseResponse({
        schema: transactionSchema("confirmOrderResponse")
      })
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_HANDLE_TRANSACTION),
    handler: StaffController.confirmOrderHandler
  },
  {
    method: ["PUT"],
    url: "/users",
    schema: {
      tags: ["Staff Services"],
      security: [
        {
          authorization: []
        }
      ],
      summary: "Staff & Admin Edit Users",
      body: userSchema("editUserRequest"),
      response: baseResponse({
        schema: userSchema("editUserResponse")
      })
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_EDIT_USER),
    handler: StaffController.editUserHandler
  },
  {
    method: ["GET"],
    url: "/orders/delivery",
    schema: {
      tags: ["Staff Services"],
      summary: "Staff & Admin Get Ready Delivery Orders",
      security: [
        {
          authorization: []
        }
      ],
      response: baseResponse({
        schema: transactionSchema("readyDeliveryListResponse")
      })
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_HANDLE_SHIPPING),
    handler: StaffController.readyDeliveryListHandler
  },
  {
    method: ["GET"],
    url: '/orders/shipping',
    schema: {
      tags: ["Staff Services"],
      summary: "Staff & Admin Get On Shipping Orders",
      security: [
        {
          authorization: []
        }
      ],
      response: baseResponse({
        schema: transactionSchema("onDeliveryListResponse")
      })
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_HANDLE_SHIPPING),
    handler: StaffController.onDeliveryListHandler
  },
  {
    method: ["GET"],
    url: "/orders/confirm",
    schema: {
      tags: ["Staff Services"],
      summary: "Staff & Admin Get Confirmed Order List",
      security: [
        {
          authorization: []
        }
      ],
      response: baseResponse({
        schema: transactionSchema("confirmedOrderListResponse")
      })
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_VIEW_PRODUCT),
    handler: StaffController.confirmedOrderListHandler
  },
  {
    method: ["GET"],
    url: "/transactions/:order_no",
    schema: {
      tags: ["Staff Services"],
      summary: "Staff & Admin Get Transaction Details",
      params: transactionSchema("transactionDetailsRequest"),
      security: [
        {
          authorization: []
        }
      ],
      response: baseResponse({
        schema: transactionSchema("transactionDetailsResponse")
      })
    },
    preHandler: Auth.CheckRules(ListRules.ACCESS_HANDLE_TRANSACTION),
    handler: StaffController.transactionDetailsHandler
  }
];

export default async function StaffRoutes(server: FastifyInstance) {
  server.addHook("preHandler", Auth.CheckAuth)
  server.addHook("preHandler", Log.ActivityLogging)
  for (const route of routes) {
    server.route({ ...route })
  }
}