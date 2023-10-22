const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); 

const db = require('./db');

db.hello();

// Creating express app object
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// CORS is enabled for the selected origins
let corsOptions = {
    origin: [ 'http://localhost:5500', 'http://localhost:3000' ]
};

app.use(cors(corsOptions));


// Expected request form:
// {clientId: string; userName: string;}
app.post('/api/join', (req, res) => {
    const uuid = new uuidv4();
    const user = {
        clientId: req.clientId,
        id: uuid,
        name: req.userName,
    }

    db.joinRoom(req.roomCode, user);
});

// Expected request form
// {clientId: string; userName: string;}
app.post('/api/create', (req, res) => {
    //TODO: Assert the request is in the correct form
    
    console.log('Creating new room');

    const now = new DateTime();
    const roomid = new uuidv4();

    const uuid = new uuidv4();

    const owner = {
        clientId: req.userId,
        id: uuid,
        name: req.userName,
    }

    const room = {
        owner,
        id: roomid,
        roomCode: uuid.substr(uuid.length - 4),
        users: [owner]
    }

    db.createRoom();

    res.send();

});

const port = 5000;
app.listen(5000);
