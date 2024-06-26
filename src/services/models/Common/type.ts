import { File } from "fastify-multer/lib/interfaces";
import { Options } from 'amqplib'

class BaseError extends Error {
    code: string;
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.code = this.constructor.name;
        this.statusCode = 400;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class RequestError extends BaseError {
    constructor(message: string) {
        super(message)
        this.statusCode = 400
    }
}

export class UnathorizedError extends BaseError {
    constructor(message: string) {
        super(message)
        this.statusCode = 401
    }
}

export class ForbiddenAccessError extends BaseError {
    constructor(message: string) {
        super(message)
        this.statusCode = 403
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message)
        this.statusCode = 404
    }
}

export class ServerError extends BaseError {
    constructor(message: string) {
        super(message)
        this.statusCode = 500
    }
}

export type BaseResponse = { schema: any, statusCode?: number }

export type UploadImage = { file: Required<File>, filename: string, dir: string }

export type GetImageURLParams = {
    pathdir: string
    filename: string
}

export type AMQPConnection = Options.Connect & {
    serviceName: string
    queue: string
}