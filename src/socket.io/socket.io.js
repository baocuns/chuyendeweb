import socketIOClient from "socket.io-client";
import { API_HOST } from "../init"

const SocketIo = () => {
    const socket = socketIOClient.connect(API_HOST) 

    socket.on('connect', () => {
        console.log('connect', socket.id);
    });
    socket.on("disconnect", () => {
        console.log(socket.id); // undefined
    });

    return socket
}

const socket = SocketIo()

export default socket