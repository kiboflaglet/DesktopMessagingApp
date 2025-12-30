import { serviceResponse } from "@/common/utils/serviceResponse";
import express, { type Router } from "express";

export const healthRouter: Router = express.Router()

healthRouter.get("/", (_req, res) => {
    const response = serviceResponse.success("app works very well", null)
    res.status(response.statusCode).send(response)
})
