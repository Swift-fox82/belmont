const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../../core/db');
const config = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('whitelist a user')
        .addUserOption(option => option.setName('user').setDescription('the user to whitelist').setRequired(true)),
    /**
     *
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        var user = interaction.options.getUser('user');

        if (interaction.user.id === interaction.guild.ownerId || interaction.user.id === config.Dev.hyron) {
            const isWhitelisted = await db.get(`${interaction.guild.id}_wl_${user.id}`);
            if (!isWhitelisted) {
                await db.set(`${interaction.guild.id}_wl_${user.id}`, true);
                await interaction.reply({ content: `Whitelisted ${user.tag} successfully.`, ephemeral: true });
            } else {
                await interaction.reply({
                    content: `${user.tag} is already whitelisted.`,
                    ephemeral: true
                });
            }
        } else {
            await interaction.reply({
                content: 'This command is for the server owner only.',
                ephemeral: true
            });
        }
    }
};