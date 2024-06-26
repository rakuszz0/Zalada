import { ConsumeMessage } from "amqplib";
import * as MailerService from "./services/MailServices";

export async function ConsumerMessageHandler(msg: ConsumeMessage | null) {
    try {
        if(msg && msg.content) {
            const message: any = JSON.parse(msg.content.toString())
            if(message.func in MailerService) {
                const func = message.func as keyof typeof MailerService
                if(typeof MailerService[func] !== 'function') {
                    throw new Error('UNKNOWN_COMMAND')
                }

                return MailerService[func](message as any)
            }
        }
    } catch (error) {
        const payload = { message: error }
        console.log(JSON.stringify(payload))
    }
}