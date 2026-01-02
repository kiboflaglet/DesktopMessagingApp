import { type Server } from "socket.io";

let io: Server | null = null


export const setIO = (instance: Server) => {
    if (io) return
    io = instance
}

export const getIO = () => {
    if (!io) {
        throw new Error("WebSocket is not initialized")
    }

    return io
}