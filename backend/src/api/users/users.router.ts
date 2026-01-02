import express, { type Router } from "express";
import { usersController } from "./users.controller";


export const usersRouter: Router = express.Router();

usersRouter.get("/", usersController.getUsers)
usersRouter.get("/:id", usersController.getUserById)
usersRouter.post("/auth/login", usersController.login)
usersRouter.post("/auth/register", usersController.register)
usersRouter.get("/auth/me", usersController.getCurrentSessionFromUser)