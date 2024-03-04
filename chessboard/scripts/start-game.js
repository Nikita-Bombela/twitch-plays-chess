//CSS
require("../css/main.css");

const { Chess } = require('chess.js');
const io = require('socket.io-client');
const updateStatus = require('./status/update-status');
const setGameType = require('./set-game-type');
const socket = io('http://localhost:3000');
function onSnapEnd () {
    window.board.position(window.game.fen());
}

function connectSocket() {
    socket.on('connect', () => {
        socket.on('move', (data) => {
            console.log(data);
            if (window.game.moves().some(legalMove => legalMove === data)) {
                window.game.move(data);
                onSnapEnd();
                updateStatus(window.$status);
            } else {
                console.error('Illegal move, ', data);
            }
        });

        socket.on('gMoveList', () => {
            console.log(window.game.moves());
            socket.emit('rMoveList', window.game.moves());
        });

        socket.on('startNewGame', (isForce) => {
            if (isForce || window.game.isGameOver() || window.game.isDraw()) {
                window.board.start();
            } else {
                console.log('Game in progress...');
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
}

$(document).ready(function() {
    window.board = null;
    window.game = new Chess();
    window.$status = $('#status');

    const config = {
        draggable: true,
        position: 'start'
    }
    window.board = Chessboard('chess-board', config);

    updateStatus(window.$status);
    setGameType('Please select Game Type')
    connectSocket();
});