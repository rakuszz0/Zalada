import amqp from "./amqp";
import database from "./database";
import mailer from "./mailer";
import websocket from "./websocket";

export const InfraAMQP = amqp
export const InfraDB = database
export const InfraMailer = mailer
export const InfraWS = websocket