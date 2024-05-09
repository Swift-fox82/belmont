const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');
const db = require('../core/db');
const client = require('../..');

module.exports = {
    name: Events.GuildRoleDelete,
    async execute(role) {
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
                role.clone();
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
    }
}