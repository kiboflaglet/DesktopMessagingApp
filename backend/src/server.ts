import express, { type Express } from "express"
import { healthRouter } from "./api/health/health.router"
import { usersRoute } from "./api/users/users.router"
import cors from 'cors'
const app: Express = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/health', healthRouter )
app.use('/users', usersRoute)

export { app }
