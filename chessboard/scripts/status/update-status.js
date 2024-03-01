module.exports = function updateStatus($status) {
    let status = ''

    let moveColor = 'White'
    if (window.game.turn() === 'b') {
        moveColor = 'Black'
    }

    // checkmate?
    if (window.game.isCheckmate()) {
        status = 'window.game over, ' + moveColor + ' is in checkmate.'
    }

    // draw?
    else if (window.game.isDraw()) {
        status = 'window.game over, drawn position'
    }

    // window.game still on
    else {
        status = moveColor + ' to move'

        // check?
        if (window.game.isCheck()) {
            status += ', ' + moveColor + ' is in check'
        }
    }

    $status.html(status);
}