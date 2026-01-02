import { randomUUID } from "crypto";
import { CreateStory, RegisterUser, Story, User, UserProtected, UserWithStory } from "./users.model";
import { prisma } from "@/lib/prisma";

//mock data
// const users: User[] = [
// {
//     id: "8e3cd532-63c7-40bd-ac5e-44232ff295c9",
//     username: "khalaf",
//     password: "$2a$12$P.bOrtLT8dgU5AxPrzlrhOKBtdSZpXa6QhYGD9pd5KhnZXx.edt1G" // 12345678
// },
// {
//     id: "66cfdd48-9d30-436b-ab64-b78909690544",
//     username: "aynur",
//     password: "$2a$12$P.bOrtLT8dgU5AxPrzlrhOKBtdSZpXa6QhYGD9pd5KhnZXx.edt1G" // 12345678
// },
// ]

export class UserRepository {
    async findAllUsers(): Promise<UserProtected[]> {
        const res = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                fullName: true
            }
        })
        return res;
    }

    async findUserById(id: string): Promise<User | null> {
        const res = await prisma.user.findFirst({
            where: { id },
            select: {
                id: true,
                username: true,
                fullName: true,
                password: true
            }
        })
        return res
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const res = await prisma.user.findFirst({
            where: { username },
            select: {
                id: true,
                username: true,
                fullName: true,
                password: true
            }
        })
        return res
    }

    async createUser(data: RegisterUser): Promise<UserProtected | null> {

        const res = await prisma.user.create({
            data,
            select: {
                id: true,
                username: true,
                fullName: true
            }
        })

        return res
    }

    async findUsersWithStories(): Promise<UserWithStory[]> {
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
