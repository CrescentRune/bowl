let sqlite3 = require('sqlite3');
let db = new sqlite3('server/db/bowl.db');

const generateRoomsTable = `
    CREATE TABLE IF NOT EXISTS room (
        id VARCHAR(16),
        started DATETIME,
        status VARCHAR(3),
        owner text,
        PRIMARY KEY('id')
    );
`;

const createOpenRoomsView = `
    CREATE VIEW open_rooms AS 
    SELECT id, substr(id, -4) AS join_code FROM room WHERE status='OPEN';
`

const generatePaperTable = `
    CREATE TABLE IF NOT EXISTS paper (
        room_id VARCHAR(16) FOREIGN KEY REFERENCES room,
        submitter TEXT,
        body TEXT,
    );
`

const createRoomPaperIndex = `
    CREATE INDEX IF NOT EXISTS room_paper ON paper (room_id);
`


function init_db() {
   db.exec(
     generateRoomsTable,
     generatePaperTable,
     createOpenRoomsView,
     createRoomPaperIndex
   );
}

function create_room(owner) {
   insertRoomQueryString = `INSERT INTO room (owner, room_id, started) VALUES (?, ?);` 

   //db.run(inserRoomQueryString, owner.
}

init_db();

function hello() {
    console.log('hello');
}

function createRoom(room) {
    //db.

    rooms.push(room);

    return room;
}

function joinRoom(roomCode, user) {
    let roomToJoin = rooms.find((room) => room.roomCode === roomCode);

    roomToJoin.users.push(user);

    return roomToJoin;
}

module.exports = { hello, createRoom, joinRoom}
