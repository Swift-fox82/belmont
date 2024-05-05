const { Client, GatewayIntentBits, AuditLogEvent, EmbedBuilder } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const db = require('./src/core/db');

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

for (const handler of fs.readdirSync('./handlers').filter(file => file.endsWith('.js'))) {
    require(`./handlers/${handler}`)(client);
}


client.on('channelCreate', async channel => {
    const fetchLog = await channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelCreate
    }).then(x => x.entries.first());
    if(!fetchLog) return;

    const entry = fetchLog.executor
    let trusted = await db.get(`${channel.guild.id}_wl_${entry.id}`);
    let logs = await db.get(`${channel.guild.id}_dmlogs`);
    let antiNuke = await db.get(`${channel.guild.id}_antinuke`);
    if (antiNuke !== true) return;

    if (entry.id === channel.guild.ownerId || entry.id === client.user.id || entry.id === config.Dev.hyron) return;

    if (trusted === true) return;

    let author = await db.get(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
    let limit = await db.get(`${channel.guild.id}_channelcreatelimit`)

    if(!limit && logs) return;
    if(author >= limit && logs) {
        channel.guild.members.cache.get(entry.id).kick({ reason: "Belmont bot create channel anti" }).then(() => {
            channel.delete();
            const embed = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle('Channel create')
            .setDescription(`**${entry.username}** has been baned from the server.`)
            .setFields(
                { name: 'Channel', value: `${channel.name}`, inline: true },
                { name: 'Reason', value: 'Belmont bot create channel limit', inline: true }
            )
            .setFooter({ text: `${entry.tag}`, iconURL: entry.displayAvatarURL() })
            .setTimestamp();
            return client.channels.cache.get(logs).send({ embeds: [embed] });   
        });
    }    
    await db.add(`executer_${channel.guild.id}_${entry.id}_channelcreate`, 1)  

    if(logs) {
        const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('Channel create')
        .setDescription(`**${entry.username}** has been baned from the server.`)
        .setFields(
            { name: 'Channel', value: `${channel.name}`, inline: true },
            { name: 'Reason', value: 'Belmont bot create channel anti', inline: true }
        )
        .setFooter({ text: `${entry.tag}`, iconURL: entry.displayAvatarURL() })
        .setTimestamp();
        return client.channels.cache.get(logs).send({ embeds: [embed] });   
    }

})

client.on('channelDelete', async channel => {
    const fetchLog = await channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelDelete
    }).then(x => x.entries.first());
    if(!fetchLog) return;

    const entry = fetchLog.executor
    let trusted = await db.get(`${channel.guild.id}_wl_${entry.id}`);
    let logs = await db.get(`${channel.guild.id}_dmlogs`);
    let antiNuke = await db.get(`${channel.guild.id}_antinuke`);
    if (antiNuke !== true) return;

    if (entry.id === channel.guild.ownerId || entry.id === client.user || entry.id === config.Dev.hyron) return;

    if (trusted === true) return;

    let author = await db.get(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
    let limit = await db.get(`${channel.guild.id}_channeldeletelimit`)

    if(!limit && logs) return;
    if(author >= limit && logs) {
        channel.guild.members.cache.get(entry.id).kick({ reason: "Belmont bot delete channel anti" }).then(() => {
            channel.clone();
            const embed = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle('Channel delete')
            .setDescription(`**${entry.username}** has been baned from the server.`)
            .setFields(
                { name: 'Channel', value: `${channel.name}`, inline: true },
                { name: 'Reason', value: 'Belmont bot delete channel limit', inline: true }
            )
            .setFooter({ text: `${entry.tag}`, iconURL: entry.displayAvatarURL() })
            .setTimestamp();
            return client.channels.cache.get(logs).send({ embeds: [embed] });   
        });
    }    
    await db.add(`executer_${channel.guild.id}_${entry.id}_channeldelete`, 1)  

    if(logs) {
        const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('Channel delete')
        .setDescription(`**${entry.username}** has been baned from the server.`)
        .setFields(
            { name: 'Channel', value: `${channel.name}`, inline: true },
            { name: 'Reason', value: 'Belmont bot delete channel anti', inline: true }
        )
        .setFooter({ text: `${entry.tag}`, iconURL: entry.displayAvatarURL() })
        .setTimestamp();
        return client.channels.cache.get(logs).send({ embeds: [embed] });   
    }

})

client.on('roleCreate', async role => {
    const fetchLog = await role.guild.fetchAuditLogs({
        type: AuditLogEvent.RoleCreate
    }).then(x => x.entries.first());
    if(!fetchLog) return;

    const entry = fetchLog.executor
    let trusted = await db.get(`${role.guild.id}_wl_${entry.id}`);
    let logs = await db.get(`${role.guild.id}_dmlogs`);
    let antiNuke = await db.get(`${role.guild.id}_antinuke`);
    if (antiNuke !== true) return;

    if (entry.id === role.guild.ownerId || entry.id === client.user.id || entry.id === config.Dev.hyron) return;

    if (trusted === true) return;

    let author = await db.get(`executer_${role.guild.id}_${entry.id}_rolecreate`)
    let limit = await db.get(`${role.guild.id}_rolecreatelimit`)

    if(!limit && logs) return;
    if(author >= limit && logs) {
        role.guild.members.cache.get(entry.id).kick({ reason: "Belmont bot create role anti" }).then(() => {
            role.delete();
            const embed = new EmbedBuilder()
            .setColor('Gold')
            .setTitle('role create')
            .setDescription(`**${entry.username}** has been baned from the server.`)
            .setFields(
                { name: 'role', value: `${role.name}`, inline: true },
                { name: 'Reason', value: 'Belmont bot create role limit', inline: true }
            )
            .setFooter({ text: `${entry.tag}`, iconURL: entry.displayAvatarURL() })
            .setTimestamp();
            return client.channels.cache.get(logs).send({ embeds: [embed] });   
        });
    }    
    await db.add(`executer_${role.guild.id}_${entry.id}_rolecreate`, 1)  

    if(logs) {
        const embed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle('role create')
        .setDescription(`**${entry.username}** has been baned from the server.`)
        .setFields(
            { name: 'role', value: `${role.name}`, inline: true },
            { name: 'Reason', value: 'Belmont bot create role anti', inline: true }
        )
        .setFooter({ text: `${entry.tag}`, iconURL: entry.displayAvatarURL() })
        .setTimestamp();
        return client.channels.cache.get(logs).send({ embeds: [embed] });   
    }

})

client.on('roleDelete', async role => {
    const fetchLog = await role.guild.fetchAuditLogs({
        type: AuditLogEvent.RoleDelete
    }).then(x => x.entries.first());
    if(!fetchLog) return;

    const entry = fetchLog.executor
    let trusted = await db.get(`${role.guild.id}_wl_${entry.id}`);
    let logs = await db.get(`${role.guild.id}_dmlogs`);
    let antiNuke = await db.get(`${role.guild.id}_antinuke`);
    if (antiNuke !== true) return;

    if (entry.id === role.guild.ownerId || entry.id === client.user.id || entry.id === config.Dev.hyron) return;

    if (trusted === true) return;

    let author = await db.get(`executer_${role.guild.id}_${entry.id}_roledelete`)
    let limit = await db.get(`${role.guild.id}_roledeletelimit`)

    if(!limit && logs) return;
    if(author >= limit && logs) {
        role.guild.members.cache.get(entry.id).kick({ reason: "Belmont bot delete role anti" }).then(() => {
            role.delete();
            const embed = new EmbedBuilder()
            .setColor('Gold')
            .setTitle('role delete')
            .setDescription(`**${entry.username}** has been baned from the server.`)
            .setFields(
                { name: 'role', value: `${role.name}`, inline: true },
                { name: 'Reason', value: 'Belmont bot delete role limit', inline: true }
            )
            .setFooter({ text: `${entry.tag}`, iconURL: entry.displayAvatarURL() })
            .setTimestamp();
            return client.channels.cache.get(logs).send({ embeds: [embed] });   
        });
    }    
    await db.add(`executer_${role.guild.id}_${entry.id}_roledelete`, 1)  

    if(logs) {
        const embed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle('role delete')
        .setDescription(`**${entry.username}** has been baned from the server.`)
        .setFields(
            { name: 'role', value: `${role.name}`, inline: true },
            { name: 'Reason', value: 'Belmont bot delete role anti', inline: true }
        )
        .setFooter({ text: `${entry.tag}`, iconURL: entry.displayAvatarURL() })
        .setTimestamp();
        return client.channels.cache.get(logs).send({ embeds: [embed] });   
    }

})

// client.on('guildMemberAdd', async member => {
//     const entry1 = await member.guild.fetchAuditLogs().then(x => x.entries.first())
//     if(entry1.action === AuditLogEvent.BotAdd ) {
//         const entry2 = await member.guild.fetchAuditLogs({
//             type: AuditLogEvent.BotAdd
//         }).then(x => x.entries.first())

//         const entry = entry2.executor
//         let trusted = await db.get(`${role.guild.id}_wl_${entry.id}`);
//         let logs = await db.get(`${role.guild.id}_dmlogs`);
//         let antiNuke = await db.get(`${role.guild.id}_antinuke`);
//         if (antiNuke !== true) return;
    
//         if (entry.id === role.guild.ownerId || entry.id === client.user.id || entry.id === config.Dev.hyron) return;
    
//         if (trusted === true) return;


//     }
// })

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(config.token).then(() => {
    console.log('Bot is ready');
});