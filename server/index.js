import http from 'http';
import express from 'express';
import * as io from 'socket.io';
// socket configuration
import WebSockets from '../utils/WebSockets.js';

const app = express();

const port = process.env.port || '5000';
app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* catch 404, and handover to error handler */
app.use('*', (req, res) => {
    return res.status(400).json({
        success: false,
        message: "API endpoint doesn't exist",
    });
});

/* Create HTTP server */
const server = http.createServer(app);
/* Create socket connection */
const socketio = new io.Server(server);
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection);
/* Listen on port, on all network interfaces */
server.listen(port);
/* Event listener for HTTP server "listening" event */
server.on('listening', () => {
    console.log(`Listening on port:: http://localhost:${port}`);
});

// export for tests
module.exports = app;
