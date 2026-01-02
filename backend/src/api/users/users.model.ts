import z from "zod";

export const UserSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(1),
    fullName: z.string().min(1),
    password: z.string().min(8)
})

export type User = z.infer<typeof UserSchema>;

export const LoginUserSchema = UserSchema.pick({
    username: true,
    password: true
})

export type LoginUser = z.infer<typeof LoginUserSchema>


export const RegisterUserSchema = UserSchema.pick({
    username: true,
    password: true,
    fullName: true,
})

export type RegisterUser = z.infer<typeof RegisterUserSchema>

export const RefreshLoginUserSchema = z.object({
    accessToken: z.string().min(64).optional(),
    refreshToken: z.string().min(64)
})

export type RefreshLoginUser = z.infer<typeof RefreshLoginUserSchema>


export type UserToken = {
    id: string;
    username: string;
    fullName: string;
    accessToken: string;
    refreshToken: string;
}

export type AccessTokenPayload = {
    id: string
}

export type RefreshTokenPayload = {
    id: string
}

export const UserProtectedSchema = UserSchema.pick({
    id: true,
    username: true,
    fullName: true,
})

export type UserProtected = z.infer<typeof UserProtectedSchema>

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

export type UserWithStory = UserProtected & {
    stories: Story[]
}



