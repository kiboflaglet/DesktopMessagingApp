import z from "zod"
import { UserProtected } from "../users/users.model"

export type UserWithStory = UserProtected & {
    stories: Story[]
}


export const StorySchema = z.object({
    id: z.string().uuid(),
    content: z.string().min(1),
    userId: z.string().uuid()
})

export const CreateStorySchema = StorySchema.omit({
    id: true
})

export type Story = z.infer<typeof StorySchema>
export type CreateStory = z.infer<typeof CreateStorySchema>

