import { createContext, useContext, type ReactNode } from "react";
import type { User } from "../types";

const Context = createContext<User | null>(null)
export const useUserContext = () => {
    const context = useContext(Context)
    return context
}

type UserContextType = {
    user: User | null;
    children: ReactNode
}





export const UserProvider = ({ ...props }: UserContextType) => {


    return (
        <Context.Provider value={props.user}>
            {props.children}
        </Context.Provider>
    )

}
