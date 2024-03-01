const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const tmi = require('tmi.js');
const fs = require('fs');
const path = require('path');
const GAME_MODES = require('./consts/modes');
const challengeCommand = require('./commands/challenge');
const moveCommand = require('./commands/move');

const configFilePath = path.join(__dirname, '..', 'config', 'api-config.json');
const configUTF8 = fs.readFileSync(configFilePath, 'utf-8');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const opts = JSON.parse(configUTF8);
const client = new tmi.client(opts);
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

// TODO: make it work dynamically
const SELF_USER = '#mortepixel';
let contestants = [];

function onMessageHandler (socket, target, context, msg, self) {
    if (self) { return; }
    const fromUser = context.username;
    const [command, move] = msg.trim().split(' ');
    switch (command) {
        case '!new':
            socket.emit('startNewGame');
            break;
        case '!chlng':
            challengeCommand(contestants, fromUser, client);
            break;
        case '!m':
            moveCommand(socket, move);
            break;
        case '!moveList':
            socket.emit('gMoveList');
            break;
    }
}

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
        client.disconnect();
    });

    socket.on('rMoveList', (data) => {
        client.say(SELF_USER, `Valid Moves are: ${data.join(" ")}`);
    });

    client.on('message', (target, context, msg, self) => {
        onMessageHandler(socket, target, context, msg, self);
    });
    client.on('connected', onConnectedHandler);
    client.connect().catch((err) => {
        console.log('Connection error!', err)
    });
});

server.listen(3000, () => {
    console.log('Server listening on *:3000');
});