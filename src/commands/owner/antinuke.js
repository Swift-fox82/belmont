const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../../core/db');
const config = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('anti')
    .setDescription('Enable or disable the anti')
    .addStringOption(option => option.setName('action').setDescription('Whether to enable or disable the anti')
        .addChoices(
            {name: 'Enbale', value: 'on'},
            {name: 'Disable', value: 'off'}
        )
    ),

    /**
     *
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        var action = interaction.options.getString('action');
        let isActivated = await db.get(`${interaction.guild.id}_antinuke`)

        if(interaction.user.id === interaction.guild.ownerId || interaction.user.id === config.Dev.hyron) {
            switch(action) {
                case 'on':
                    if(isActivated) {
                        return interaction.reply({ content: ':warning: The anti is already enabled.', ephemeral: true })
                    } else {
                        await db.set(`${interaction.guild.id}_antinuke`, true);
                        return interaction.reply({ content: ':white_check_mark: The anti has been enabled.', ephemeral: true })
                    }
                case 'off':
                    if(!isActivated) {
                        return interaction.reply({ content: ':warning: The anti is already disabled.', ephemeral: true })
                    } else {
                        await db.delete(`${interaction.guild.id}_antinuke`);
                        return interaction.reply({ content: ':white_check_mark: The anti has been disabled.', ephemeral: true })
                    }
            }
        } else {
            return interaction.reply({
                content: 'This command is for the server owner only.',
                ephemeral: true
            });
        }
    }
}