import { Request, RequestHandler, Response } from "express";
import { userService } from "./users.service";
import { LoginUserSchema, RefreshLoginUserSchema, RegisterUserSchema } from "./users.model";
import { serviceResponse } from "@/common/utils/serviceResponse";
import { handleError } from "@/common/utils/handleError";
import { StatusCodes } from "http-status-codes";

class UsersController {
    public getUsers: RequestHandler = async (_req: Request, res: Response) => {
        const response = await userService.findAll()
        res.status(response.statusCode).send(response)
    }

    public login: RequestHandler = async (req: Request, res: Response) => {
        const loginValidated = LoginUserSchema.safeParse(req.body)
        if (!loginValidated.success) {
            const result = serviceResponse.failure("Login failed", null)
            handleError("Error occured while user login in controller: " + loginValidated.error.message)
            return res.status(result.statusCode).send(result)
        }
        const response = await userService.login(loginValidated.data)
        res.status(response.statusCode).send(response)
    }

    public refreshLogin: RequestHandler = async (req: Request, res: Response) => {

        const refreshLoginTokenValidated = RefreshLoginUserSchema.safeParse(req.body)
        if (!refreshLoginTokenValidated.success) {
            const result = serviceResponse.failure("Login refresh failed", null)
            handleError("Error occured while user refresing login in controller: " + refreshLoginTokenValidated.error.message)
            return res.status(result.statusCode).send(result)
        }
        const response = await userService.refreshLogin(refreshLoginTokenValidated.data)
        res.status(response.statusCode).send(response)

    }

    public register: RequestHandler = async (req: Request, res: Response) => {

        const registerValidated = RegisterUserSchema.safeParse(req.body)
        if (!registerValidated.success) {
            const result = serviceResponse.failure("Register failed", null, StatusCodes.BAD_REQUEST)
            handleError("Error occured while registering user in controller: " + registerValidated.error.message)
            return res.status(result.statusCode).send(result)
        }
        const response = await userService.register(registerValidated.data)
        res.status(response.statusCode).send(response)

    }

}

export const usersController = new UsersController()