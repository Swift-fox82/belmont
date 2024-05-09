const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');
const db = require('../core/db');
const client = require('../..');

module.exports = {
    name: Events.ChannelDelete,
    async execute(channel) {
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
    
    }
}