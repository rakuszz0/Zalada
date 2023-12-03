import { FastifyReply, FastifyRequest } from "fastify";
import * as UserDomainService from "src/services/domain/User";

export async function getStaffsHandler( request: FastifyRequest, reply: FastifyReply) {
  const staff = await UserDomainService.getStaffsDomain();
  reply.send(staff);
}
