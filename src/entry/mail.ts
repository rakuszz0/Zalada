import 'dotenv/config'

import AMQPService from "@infrastructure/amqp";
import { mailEnvSchema } from "src/config/app";
import { ConsumerMessageHandler } from "src/controller/amqp/singlequeue/consumer";
import logger from 'src/utils/logger';

async function start() {
    try {
        await mailEnvSchema.parseAsync(process.env)

        const queue = 'zalada-mail'

        const amqp = await AMQPService.createSingleQueueConsumer({
            vhost: process.env.AMQP_VHOST,
            hostname: process.env.AMQP_HOST,
            username: process.env.AMQP_USERNAME,
            password: process.env.AMQP_PASSWORD,
            queue,
            serviceName: 'zalada-mail',
            protocol: 'amqp'
        })

        amqp.consume(queue, ConsumerMessageHandler, { noAck: true })   
    } catch (error) {
        logger.info({ message: error })
    }
}

start()