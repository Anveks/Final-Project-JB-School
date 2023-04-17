
import http from "http";
import socketIo, { Server as SocketIOServer, Socket } from "socket.io";

let socketServer: SocketIOServer;

function init(httpServer: http.Server):void{
    const option = { cors: {origin:"*"}};
    socketServer = new socketIo.Server(httpServer, option);

    socketServer.sockets.on("connection", (socket: Socket) =>{
        console.log(socket.id);
    })
}

function getSocketServer(): SocketIOServer {
    return socketServer;
}

export default {
    init,
    getSocketServer
}