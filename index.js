const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

module.exports = client;

for (const handler of fs.readdirSync('./handlers').filter(file => file.endsWith('.js'))) {
    require(`./handlers/${handler}`)(client);
}

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(config.token).then(() => {
    console.log('Bot is ready');
});