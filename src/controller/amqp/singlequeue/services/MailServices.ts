import InfraMail from "@infrastructure/mailer"
import { MailOptions } from "nodemailer/lib/json-transport"
import logger from "src/utils/logger"

export async function SendMail(params: MailOptions) {
    try {
        const transporter = InfraMail.getTransporter()

        await transporter.sendMail(params)

        logger.info({ message: "zalada-mail send mail successfull" })        
    } catch (error) {
        logger.info({ message: 'zalada-mail send mail failed', reason: error })
    }

}