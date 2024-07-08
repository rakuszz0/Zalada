import 'dotenv/config'

import { InfraMailer, InfraAMQP } from "@infrastructure/Common";
import { mailAppSchema } from "src/config/app";
import { ConsumerMessageHandler } from "src/controller/amqp/singlequeue/consumer";
import logger from 'src/utils/logger';

async function start() {
    try {
        await mailAppSchema.parseAsync(process.env)

        await InfraMailer.init()

        const queue = process.env.AMQP_MAILER_QUEUE

        const amqp = await InfraAMQP.createSingleQueueConsumer({
            vhost: process.env.AMQP_VHOST,
            hostname: process.env.AMQP_HOST,
            username: process.env.AMQP_USERNAME,
            password: process.env.AMQP_PASSWORD,
            queue,
            serviceName: process.env.AMQP_MAILER_NAME
        })

        amqp.consume(queue, ConsumerMessageHandler, { noAck: true })   
    } catch (error) {
        logger.info({ message: 'zalada-mail', reason: error })
    }
}

start()