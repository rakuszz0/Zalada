import { FastifyInstance, RouteOptions } from "fastify";
import * as ConsumerController from "src/controller/ConsumerController";
import { userSchema } from "src/services/models/User";
import { cartSchema } from "src/services/models/Cart";
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
        },
    },
    handler: ConsumerController.getProductHandler,
  },
  {
    method: ["POST"],
    url: "/login",
    schema: {
      tags: ["Consumer Services"],
      summary: "Customer Login",
      body: userSchema("loginRequest")
    },
    handler: ConsumerController.loginHandler
  },
  {
    method: ["POST"],
    url: "/register",
    schema: {
      tags: ["Consumer Services"],
      summary: "Customer Register",
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
    url: "/orders",
    schema: {
      tags: ["Consumer Services"],
      body: transactionSchema("createOrderRequest"),
      summary: "Customer Create New Order",
      security: [
        {
          authorization: []
        }
      ],
      response: {
        201: transactionSchema("createOrderResponse")
      }
    },
    preHandler: Auth.CheckAuth,
    handler: ConsumerController.createOrderHandler
  },
  {
    method: ["GET"],
    url: "/orders/payment",
    schema: {
      tags: ["Consumer Services"],
      summary: "Customer Get Payment Type",
      response: {
        200: transactionSchema("getPaymentTypesResponse")
      }
    },
    handler: ConsumerController.getPaymentTypesHandler
  },
  {
    method: ["POST"],
    url: "/transaction/transaction-history",
    schema: {
        tags: ["Consumer Services"],
        body: transactionSchema('transactionHistoryRequest'),
        response: {
          200: transactionSchema('transactionHistoryResponse')
        }

    },
    handler: ConsumerController.TransactionHistoryHandler,
  },
  {
    method: ["POST"],
    url: "/orders/payment",
    schema: {
      tags: ["Consumer Services"],
      summary: "Customer Payment Order",
      body: transactionSchema("paymentOrderRequest"),
      security: [
        {
          authorization: []
        }
      ],
      response: {
        200: transactionSchema("paymentOrderResponse")
      }
    },
    preHandler: Auth.CheckAuth,
    handler: ConsumerController.paymentOrderHandler
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
  },
  {
    method: ["GET"],
    url: "/orders/:order_no",
    schema: {
      tags: ["Consumer Services"],
      summary: "Get Order Information",
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
  },
  {
    method: ["POST"],
    url: "/product-details",
    schema:{
      tags: ["Consumer Services"],
      body: productSchema("getProductDetails"),
      response:{
        200: productSchema("getProductDetailsResponse")
      }
    },
    handler: ConsumerController.getProductDetailsHandler
  }
];

export default async function ConsumerRoutes(server: FastifyInstance) {
  for (const route of routes) {
    server.route({ ...route });
  }
}