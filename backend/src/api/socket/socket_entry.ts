import type { Server as IOProps, Socket } from "socket.io";
import { SOCKET_EVENTS } from "./socket_events";
import { RegisterStorySocket } from "./stories.socket";

export const SocketEntry = (io: IOProps) => {
    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
        RegisterStorySocket(socket)
    })
}