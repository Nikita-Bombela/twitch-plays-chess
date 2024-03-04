const Chatter = require('./Chatter');

module.exports = class ChattersMock {
    constructor(amount, base = {}) {
        if (typeof amount !== "number") {
            throw "ChattersMock::Incorrect params"
        }

        this.amount = amount;
        this.current = 1;
        this.chatters = [];

        const chatterConfig = Object.assign({}, base);
        for (let i = 1; i <= amount; i++) {
            this.chatters.push(new Chatter(base));
        }
    }

    get chatter() {
        const chatter = this.chatters[this.current];
        this.setNewCurrent();
        return chatter;
    }

    setNewCurrent() {
        const newCurrent = this.current + 1;
        this.current = newCurrent > this.amount
            ? 1
            : newCurrent;
    }
}