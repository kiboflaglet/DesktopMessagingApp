import { SocketEntry } from "@/api/socket/socket_entry"
import { setIO } from "@/api/socket/socket_singleton"
import type { Server as HttpServer } from "http"
import { Server } from "socket.io"

export const initSocket = (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173"
        }
    })

    setIO(io)
    SocketEntry(io)


    return io
}