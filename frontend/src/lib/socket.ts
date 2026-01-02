import { io } from "socket.io-client";
import { API } from "../constants";

export const socket = io(API, {
    autoConnect: false
})