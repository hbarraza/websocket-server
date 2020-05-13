const path = require('path');
const express = require('express');
const app = express();

// Settings Server
app.set('port', process.env.PORT || 3000);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Inicializa el server
const server = app.listen(app.get('port'), ()=> {
    console.log('server on port', app.get('port'));
});

// Conf del chat
const SocketIO = require('socket.io');
const io = SocketIO(server);    //Requiere de un server para comunicacion, en este caso express. Inicia el listen

// WebSockets
//escucha evento nueva conexion
io.on('connection', (socket) => {
    console.log('new conection', socket.id);

    //escucha evento
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', (data) => {
        //Emitir mensaje a todos excepto a mi
        socket.broadcast.emit('chat:typing', data);
    })
});
