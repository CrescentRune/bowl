import { UUID } from 'crypto';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const db = require('./db/db');

db.hello();

// Creating express app object
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded());

export function newUUID(): UUID {
    return crypto.randomUUID();
}

// CORS is enabled for the selected origins
let corsOptions = {
    origin: [ 'http://localhost:5500', 'http://localhost:3000' ]
};

app.use(cors(corsOptions));

export type JoinRequestBody = {
    name: string;
    roomCode: string;
}

export type CreateRequestBody = {
    name: string;
}

export interface TypedRequestBody<T> extends Request {
    body: T;
}

// Expected request form:
// {clientId: string; userName: string;}
app.post('/api/join', (req: TypedRequestBody<JoinRequestBody>, res) => {
    const uuid = newUUID();
    const user = {
        id: uuid,
        name: req.body.name,
    }


    db.joinRoom(req.body.roomCode, user);
});

// Expected request form
// {clientId: string; userName: string;}
app.post('/api/create', (req: TypedRequestBody<CreateRequestBody>, res) => {
    //TODO: Assert the request is in the correct form
    
    console.log('Creating new room');

    const now = new Date();
    const roomid = newUUID();

    const uuid = newUUID();

    const owner = {
        id: uuid,
        name: req.body.name,
    }

    //console.log(`${req.name}(${req.clientId} is in the house!`);

    const room = {
        owner,
        id: roomid,
        roomCode: uuid.toString().substr(uuid.length - 4),
        users: [owner]
    }

    const created_room = db.createRoom(room);

    res.send(created_room.roomCode);

});

app.get('/api/paper/pull', (req, res) => {});

app.post('/api/paper/submit', (req, res) => {});

// Room permissions, allow joining,  
// Start game (allow pulls), Open room (allow people in), Lock game (prevents people joining)
app.post('/api/room/status/change', (req, res) => {});


const port = 5000;
app.listen(port);
