import { type Socket } from "socket.io"
import { UserRepository } from "../users/users.repository"

const userRepo = new UserRepository()

export const RegisterStorySocket = (socket: Socket) => {
    // socket.on(SOCKET_EVENTS.STORY_CREATED, (storyId: string) => {
    //     socket.broadcast.emit(SOCKET_EVENTS.STORY_CREATED, () => {
    //     })
    // })
}
