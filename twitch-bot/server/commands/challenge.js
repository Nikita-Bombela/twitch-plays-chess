// TODO: make it work dynamically
const SELF_USER = '#mortepixel';
const colors = ['white', 'black'];
function getColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

module.exports = (contestants, fromUser, client) => {
    if (contestants.length === 0) {
        const contColor = getColor();
        contestants.push({
            name: fromUser,
            color: contColor
        });
        client.say(SELF_USER, `${fromUser} you are playing: ${contColor}`);
    } else if (contestants.length === 1) {
        const currentContestant = contestants[0];
        if (fromUser === currentContestant.name) return;
        const contColor = colors.find(color => color !== currentContestant.color);

        contestants.push({
            name: fromUser,
            color: contColor
        });
        client.say(SELF_USER, `${fromUser} you are playing: ${contColor}`);
    } else {
        console.log(contestants);
        console.log('game ongoing');
    }
}