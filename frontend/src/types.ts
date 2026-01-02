export type serviceResponse <T> = {

    success: boolean;
    responseObject: T;
    statusCode: number;
    message: string | null


}

export type User = {
    id: string;
    username: string;
    fullName: string;
}

export type Story = {
    id: string;
    content: string;
    userId: string
}

export type UserStories = User & {
    stories: Story[]
}