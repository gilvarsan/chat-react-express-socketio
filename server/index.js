import express from "express";
import http from "http";
import {Server as SocketServer} from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

/*
LO SIGUIENTE SE HACE SOLO SI SE HACEN DE FORMA SEPARADO EL (BACKEND Y EL FRONTEND)
YA QUE SERIAN DOMINIOS DIFERENTES.
*/
/*const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});*/

io.on('connection', socket => {
    const clientID = socket.id;
    console.log('Client connected:', socket.id);

    socket.on('message', (data) => {
        console.log('Message Server', data);
        socket.broadcast.emit('message', {
            body: data,
            from: clientID.slice(0, 6)
        });
    });
});

const port = 3001;
server.listen(port);
console.log(`App listening on`, port);