import fastifyPlugin from 'fastify-plugin'
import AdminRoutes from '../routes/Admin'
import ConsumerRoutes from '../routes/Consumer'
import StaffRoutes from '../routes/Staff'

export default fastifyPlugin(async (server) => {
    await server.register(ConsumerRoutes)
    await server.register(StaffRoutes)
    await server.register(AdminRoutes, { prefix: "/admin" })
})