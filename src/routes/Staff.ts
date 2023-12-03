import { FastifyInstance, RouteOptions } from "fastify";
import * as StaffController from "src/controller/StaffController";


const routes: RouteOptions[] = [
  {
    method: ["GET"],
    url: "/staff/test",
    schema: {
      tags: ["Staff Services"],
    },
    handler: (request, reply) => reply.send("Hello In Staff"),
  },
  {
    method: ["GET"],
    url: "/staff",
    schema: {
      tags: ["Staff Services"],
    },
    handler: StaffController.getStaffsHandler,
  },
];

export default async function StaffRoutes(server: FastifyInstance) {
    for (const route of routes) {
        server.route({ ...route })
    }
}