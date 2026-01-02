import { prisma } from "@/common/lib/prisma"
import { CreateStory, Story, UserWithStory } from "./story.model"

export class StoryRepository {
    async findStoriesGroupByUsers(): Promise<UserWithStory[]> {
        const res = await prisma.user.findMany({
            where: {
                stories: {
                    some: {}
                }
            },
            select: {
                id: true,
                username: true,
                fullName: true,
                stories: true
            }
        })

        return res
    }

    async addStory(data: CreateStory): Promise<Story | null> {
        const res = await prisma.story.create({
            data
        })

        return res || null
    }
}