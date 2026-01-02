import { Request, RequestHandler, Response } from "express";
import { storyService } from "./story.service";
import { CreateStorySchema } from "./story.model";
import { serviceResponse } from "@/common/utils/serviceResponse";
import { handleError } from "@/common/utils/handleError";
import { StatusCodes } from "http-status-codes";

class StoryController {

    getStories: RequestHandler = async (_: Request, res: Response) => {
        const response = await storyService.getStories()
        res.status(response.statusCode).send(response)
    }

    createStory: RequestHandler = async (req: Request, res: Response) => {
        const storyValidated = CreateStorySchema.safeParse(req.body)
        if (!storyValidated.success) {
            const errorMessage = "Creating story failed"
            handleError(errorMessage + ": " + storyValidated.error.message)
            const response = serviceResponse.failure(errorMessage, null, StatusCodes.UNPROCESSABLE_ENTITY)
            return res.status(response.statusCode).send(response)
        }
        const response = await storyService.createStory(storyValidated.data)
        res.status(response.statusCode).send(response)
    }

}

export const storyController = new StoryController()

