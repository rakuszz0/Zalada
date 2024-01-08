import { FastifyRequest } from "fastify";
import moment from "moment";
import * as LogRepository from "src/services/repository/Log";

export async function ActivityLogging(request: FastifyRequest) {
    await LogRepository.DBCreateActivityLog({
        method: request.method,
        params: JSON.stringify(request.body || request.params),
        action: request.routeOptions.schema.summary as string,
        time: moment().unix(),
        url: request.url,
        user_id: request.user.id,
        ip: request.headers["x-forwarded-for"] as string || (request.ip == '::1' ? "127.0.0.1" : request.ip),
    })
}