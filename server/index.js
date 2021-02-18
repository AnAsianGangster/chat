import AWS from 'aws-sdk';
import http from 'http';
import express from 'express';
import * as io from 'socket.io';
// import WebSocket class
import WebSockets from '../utils/WebSockets.js';
// import dynomdb config
import DynamodbConfig from '../config/dynamodb.js';

const app = express();

const port = process.env.port || '5000';
app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// update aws with dynamodb config
AWS.config.update(DynamodbConfig);
/* --------------test for dynamodb connection ---------- */
// TODO remove this part in the future
const dynamodb = new AWS.DynamoDB();
const params = {
    TableName: 'Movies',
    KeySchema: [
        { AttributeName: 'year', KeyType: 'HASH' }, //Partition key
        { AttributeName: 'title', KeyType: 'RANGE' }, //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: 'year', AttributeType: 'N' },
        { AttributeName: 'title', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
    },
};

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to create table. Error JSON:',
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log(
            'Created table. Table description JSON:',
            JSON.stringify(data, null, 2)
        );
    }
});
/* ----------------------------------------------------- */

/* catch 400, and handover to error handler */
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
export default app;
