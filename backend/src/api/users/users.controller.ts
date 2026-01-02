import { handleError } from "@/common/utils/handleError";
import { serviceResponse } from "@/common/utils/serviceResponse";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetUserSchema, LoginUserSchema, RefreshLoginUserSchema, RegisterUserSchema } from "./users.model";
import { userService } from "./users.service";

class UsersController {
    getUsers: RequestHandler = async (_req: Request, res: Response) => {
        const response = await userService.findAll()
        res.status(response.statusCode).send(response)
    }

    login: RequestHandler = async (req: Request, res: Response) => {
        const loginValidated = LoginUserSchema.safeParse(req.body)
        if (!loginValidated.success) {
            const result = serviceResponse.failure("Login failed", null, StatusCodes.UNPROCESSABLE_ENTITY)
            handleError("Error occured while user login in controller: " + loginValidated.error.message)
            return res.status(result.statusCode).send(result)
        }


        const response = await userService.login(loginValidated.data)

        if (!response.responseObject) {
            return res.status(response.statusCode).send(response)
        }

        const { accessToken, refreshToken, ...safeUser } = response.responseObject


        res.cookie("accessToken", response.responseObject?.accessToken, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
            path: '/',
            sameSite: "lax"
        })

        res.cookie("refreshToken", response.responseObject?.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 10000,
            path: '/',
            sameSite: "lax"

        })

        res.status(response.statusCode).send({
            ...response,
            responseObject: safeUser
        })
    }

    getCurrentSessionFromUser: RequestHandler = async (req: Request, res: Response) => {

        const rawCookies = req.headers.cookie
        const cookies = rawCookies ? Object.fromEntries(rawCookies?.split("; ").map(item => {
            const [name, ...rest] = item.split("=")
            return [name, rest.join("=")]
        })) : {}

        const refreshLoginTokenValidated = RefreshLoginUserSchema.safeParse(cookies)
        if (!refreshLoginTokenValidated.success) {
            const result = serviceResponse.failure("Login refresh failed", null, StatusCodes.UNPROCESSABLE_ENTITY)
            handleError("Error occured while user refresing login in controller: " + refreshLoginTokenValidated.error.message)
            return res.status(result.statusCode).send(result)
        }
        const response = await userService.getCurrentSessionFromUser(refreshLoginTokenValidated.data)

        if (!response.responseObject) {
            return res.status(response.statusCode).send(response)
        }


        const { accessToken, refreshToken, ...safeUser } = response.responseObject

        res.cookie("accessToken", response.responseObject?.accessToken, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
            path: '/',
            sameSite: "lax"
        })

        res.cookie("refreshToken", response.responseObject?.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 10000,
            path: '/',
            sameSite: "lax"

        })
        res.status(response.statusCode).send({
            ...response,
            responseObject: safeUser
        })
    }

    register: RequestHandler = async (req: Request, res: Response) => {

        const registerValidated = RegisterUserSchema.safeParse(req.body)
        if (!registerValidated.success) {
            const result = serviceResponse.failure("Register failed", null,  StatusCodes.UNPROCESSABLE_ENTITY)
            handleError("Error occured while registering user in controller: " + registerValidated.error.message)
            return res.status(result.statusCode).send(result)
        }
        const response = await userService.register(registerValidated.data)

        if (!response.responseObject) {
            return res.status(response.statusCode).send(response)
        }

        const { accessToken, refreshToken, ...safeUser } = response.responseObject

        res.cookie("accessToken", response.responseObject?.accessToken, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
            path: '/',
            sameSite: "lax"
        })

        res.cookie("refreshToken", response.responseObject?.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 10000,
            path: '/',
            sameSite: "lax"

        })

        res.status(response.statusCode).send({
            ...response,
            responseObject: safeUser
        })

    }

    getUserById: RequestHandler = async (req: Request, res: Response) => {

        console.log(req.params);

        const getUserValidated = GetUserSchema.safeParse(req.params)

        if (!getUserValidated.success) {
            const errorMessage = "Fetching user failed"
            const response = serviceResponse.failure(errorMessage, null, StatusCodes.UNPROCESSABLE_ENTITY)
            handleError(errorMessage + ": " + getUserValidated.error.message)
            return res.status(response.statusCode).send(response)
        }

        const response = await userService.getUserById(getUserValidated.data)

        res.status(response.statusCode).send(response)
    }
}

export const usersController = new UsersController()