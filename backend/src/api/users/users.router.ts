import express, { type Router } from "express";
import { usersController } from "./users.controller";


export const usersRoute: Router = express.Router();

usersRoute.get("/", usersController.getUsers)
usersRoute.post("/auth/login", usersController.login)
usersRoute.post("/auth/register", usersController.register)
usersRoute.post("/auth/refresh", usersController.refreshLogin)