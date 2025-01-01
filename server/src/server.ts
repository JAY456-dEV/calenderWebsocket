import express from 'express'
import { WebSocketServer } from 'ws'
import http from 'http'
import createUser from './services/createUser'
import createEvent from './services/createEvent'
import getEvents from './services/getEvents'

const app = express()
app.use(express.json())

const server = http.createServer(app)

let wsServer = new WebSocketServer({ server })

wsServer.on('connection', (ws) => {
    console.log('A new client connected');

    ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'FETCH_DATA' }));
    };

    ws.on('message', async (message) => {
        const request = JSON.parse(message as any);

        switch (request.type) {
            case 'signup':
                const user = await createUser(request)
                ws.send(JSON.stringify({ type: 'USER_RESPONSE', user }));
                break;

            case 'createEvent':
                const event = await createEvent(request)
                ws.send(JSON.stringify({ type: 'EVENT_CREATED', event }));

            case 'FETCH_DATA':
                const getEvent = await getEvents()
                ws.send(JSON.stringify({ type: 'ALL_EVENTS', getEvent }));
            default:
                break;
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

server.listen(8080, () => {
    console.log('port running on 8080')
})
