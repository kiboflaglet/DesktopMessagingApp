import { prisma } from "@/common/lib/prisma";
import { GetUser, RegisterUser, User, UserProtected } from "./users.model";

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

    async findUserById(data: GetUser): Promise<User | null> {
        const res = await prisma.user.findFirst({
            where: { id: data.id },
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
}
