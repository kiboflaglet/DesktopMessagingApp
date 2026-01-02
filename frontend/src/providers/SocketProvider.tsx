import { createContext, useContext, useEffect, type ReactNode } from "react"
import { socket } from "../lib/socket"

const Context = createContext(socket)

export const SocketProvider = ({ children }: { children: ReactNode }) => {

    useEffect(() => {
        if (!socket.connected) {
            socket.connect()
        }

        return () => {
            socket.disconnect()
        }
    }, [])



    return (
        <Context.Provider value={socket}>
            {children}
        </Context.Provider>
    )
}

export const useSocket = () => useContext(Context)