import fastifyPlugin from 'fastify-plugin'
import AdminRoutes from '../routes/Admin'

export default fastifyPlugin(async (server) => {
    await server.register(AdminRoutes, { prefix: "/admin" })
})