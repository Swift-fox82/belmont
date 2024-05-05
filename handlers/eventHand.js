const fs = require('fs');

module.exports = client => {
    const eventPath = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
    for(const file of eventPath) {
        const event = require(`../src/events/${file}`)
        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}