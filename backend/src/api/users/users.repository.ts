import { randomUUID } from "crypto";
import { RegisterUser, User, UserProtected } from "./users.model";

const users: User[] = [
    {
        id: "8e3cd532-63c7-40bd-ac5e-44232ff295c9",
        username: "khalaf",
        password: "$2a$12$P.bOrtLT8dgU5AxPrzlrhOKBtdSZpXa6QhYGD9pd5KhnZXx.edt1G" // 12345678
    },
    {
        id: "66cfdd48-9d30-436b-ab64-b78909690544",
        username: "aynur",
        password: "$2a$12$P.bOrtLT8dgU5AxPrzlrhOKBtdSZpXa6QhYGD9pd5KhnZXx.edt1G" // 12345678
    },
]

export class UserRepository {
    async findAllUsers(): Promise<UserProtected[]> {
        return users.map(({ id, username }) => ({ id, username }))
    }

    async findUserById(id: string): Promise<User | null> {
        return users.find(item => item.id === id) || null
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return users.find(item => item.username === username) || null;
    }

    async createUser(data: RegisterUser): Promise<UserProtected | null> {
        const newId = randomUUID()
        const newUser = { ...data, id: newId }
        const newUserIndex = users.push(newUser)
        const userFound = users[newUserIndex - 1]
        if (!userFound) return null
        return { id: userFound.id, username: userFound.username }

    }
}
