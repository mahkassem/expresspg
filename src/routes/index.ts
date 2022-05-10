import { Router } from "express"
import authRoutes from "./auth.routes"
import usersRoutes from "./users.routes"

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/auth", authRoutes)

export default routes