
let rooms = [];

function hello() {
    console.log('hello');
}

function createRoom(room) {
    let existingRoom = rooms.find((ext_room) => ext_room.id === room.id);

    if (existingRoom) return 'error';

    rooms.push(room);
    
    return room;
}

function joinRoom(roomCode, user) {
    let roomToJoin = rooms.find((room) => room.roomCode === roomCode);

    roomToJoin.users.push(user);

    return roomToJoin;
}

module.exports = { hello, createRoom, joinRoom}