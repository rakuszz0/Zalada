import fastifyPlugin from "fastify-plugin";
import { Server, Socket } from "socket.io";
import logger from "src/utils/logger";

const users: Record<any, any[]> = {}

export default fastifyPlugin(async (server) => {
    const io = new Server(server.server, {
        cors: {
            origin: "*"
        }
    })

    server.decorate('io', io)

    const onlineListSpace = server.io.of('/users/online')

    // System events
    onlineListSpace.on('connection', (socket: Socket) => {
        const conn_data = {
            socket_id: socket.id,
            ip: socket.handshake.address
        }

        logger.info({ message: "new connected client", data: conn_data })

        socket.on('online', (user: { user_id: number }) => {
            // Connected id was still 0 (no connection)
            if(!users[user.user_id]) {
                users[user.user_id] = [{ user_id: user.user_id, ...conn_data }]
            } else {
                const isSameUser = users[user.user_id].find(u => u.ip == conn_data.ip)

                if(!isSameUser) {
                    // If user_id was more than 0 (are connection on other)
                    users[user.user_id].push({ user_id: user.user_id, ...conn_data })
                }
            }

            // Send changes to clients
            socket.local.emit('users:online', JSON.stringify(users))
        })

        socket.on("error", (err) => {
            // Remove user online
            for (const key in users) {
                const user = users[key]
                const userData = user.findIndex(user => user.socket_id == socket.id)

                // Find
                if (userData) {
                    user.splice(userData, 1)
                }

                if (!user.length) {
                    delete users[key]
                }
            }

            socket.local.emit('users:online', JSON.stringify(users))
            logger.info({ message: "ws error", err })
        })

        socket.on('disconnect', () => {
            // Remove user online
            for (const key in users) {
                const user = users[key]
                const userData = user.findIndex(user => user.socket_id == socket.id)

                // Find
                if(userData) {
                    user.splice(userData, 1)
                }

                if(!user.length) {
                    delete users[key]
                }
            }

            socket.local.emit('users:online', JSON.stringify(users))

            logger.info({ message: "user disconnected", data: conn_data })
        });
    })

    logger.info({ message: `websocket /users/online service running...` })
})

declare module "fastify" {
    interface FastifyInstance {
        io: Server
    }
}