const { SlashCommandBuilder } = require('discord.js');
const db = require('../../core/db');
const config = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('log')
    .setDescription('Enable or disable log')
    .addChannelOption(option => option.setName('channel').setDescription('The channel to send the logs').setRequired(true)),
    /**
     *
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        var log = interaction.options.getChannel('channel');
        if(interaction.user.id === interaction.guild.ownerId || interaction.user.id === config.Dev.hyron) {
            if(log) {
                await db.set(`${interaction.guild.id}_dmlogs`, log.id)
                return interaction.reply({ content: ':white_check_mark: The DM logs have been set to the channel.', ephemeral: true })
            } else {
                return interaction.reply({ content: ':warning: The channel is not valid.', ephemeral: true })
            }
        } else {
            return interaction.reply({ content: 'This command is for the server owner only.', ephemeral: true});
        }
    }
}