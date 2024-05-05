const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFolders = fs.readdirSync('./src/commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./src/commands/${folder}/`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./src/commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
	}
}

const rest = new REST().setToken(token);

console.log(`Started refreshing ${commands.length} application (/) commands.`);

rest.put(Routes.applicationGuildCommands(clientId, guildId),{ body: commands })