module.exports = function setGameType(type) {
    if (typeof type === "string") {
        $('#game-title').html(type.trim());
    }
}