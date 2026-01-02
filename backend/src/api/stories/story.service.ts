import { serviceResponse } from "@/common/utils/serviceResponse";
import { StoryRepository } from "./story.repo";
import { CreateStory, Story, UserWithStory } from "./story.model";
import { handleError } from "@/common/utils/handleError";
import { StatusCodes } from "http-status-codes";
import { SOCKET_EVENTS } from "../socket/socket_events";
import { socketResponse } from "@/common/utils/socketResponse";
import { getIO } from "../socket/socket_singleton";

class StoryService {
    private storyRepo: StoryRepository

    constructor(storyRepo: StoryRepository = new StoryRepository()) {
        this.storyRepo = storyRepo
    }


    async getStories(): Promise<serviceResponse<UserWithStory[] | null>> {
        try {
            const res = await this.storyRepo.findStoriesGroupByUsers()
            return serviceResponse.success(!!res.length ? "Stories found" : 'No stories found', res)
        } catch (error) {
            const errorMessage = "Error while fetching stories"
            handleError(`${errorMessage}: ${(error as Error).message}`)
            return serviceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async createStory(data: CreateStory): Promise<serviceResponse<Story | null>> {
        try {
            const res = await this.storyRepo.addStory(data)

            // send socket everyone including sender
            getIO().emit(SOCKET_EVENTS.STORY_CREATED, socketResponse.success(res, SOCKET_EVENTS.STORY_CREATED))

            return serviceResponse.success("Story created", res)
        } catch (error) {
            const errorMessage = "Error while creating story"
            handleError(`${errorMessage}: ${(error as Error).message}`)
            return serviceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }


}

export const storyService = new StoryService()