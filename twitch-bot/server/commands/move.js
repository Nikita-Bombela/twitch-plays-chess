module.exports = (socket, move) => {
    socket.emit('move', move);
}