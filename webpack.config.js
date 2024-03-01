const path = require('path');

module.exports = {
    entry: './chessboard/scripts/start-game.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};