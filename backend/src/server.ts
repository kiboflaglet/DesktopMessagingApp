import cors from 'cors'
import express, { type Express } from "express"
import { healthRouter } from "./api/health/health.router"
import { storyRouter } from "./api/stories/story.router"
import { usersRouter } from "./api/users/users.router"
const app: Express = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/health', healthRouter )
app.use('/users', usersRouter)
app.use('/stories', storyRouter)

export { app }
