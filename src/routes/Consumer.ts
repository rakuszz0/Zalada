import { FastifyInstance, RouteOptions } from "fastify";
import * as ConsumerController from "src/controller/ConsumerController";
import { userSchema } from "src/services/models/User";

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
        tags: ["Consumer Services"]
    },
    handler: ConsumerController.getProducstHandler,
  },
  {
    method: ["POST"],
    url: "/login",
    schema: {
      tags: ["Consumer Services"],
      body: userSchema("loginRequest")
    },
    handler: ConsumerController.loginHandler
  }
];

export default async function ConsumerRoutes(server: FastifyInstance) {
  for (const route of routes) {
    server.route({ ...route });
  }
}
