const { SlashCommandBuilder } = require('discord.js');
const db = require('../../core/db');
const config = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('limit')
    .setDescription('Set the limit for the server')
    .addStringOption(option => option.setName('limit').setDescription('The limit to set').setRequired(true).
    addChoices(
        {name: "Channelcreate", value: "channelcreate"},
        {name: "Channeldelete", value: "channeldelete"},
        {name: "Rolecreate", value: "rolecreate"},
        {name: "Roledelete", value: "roledelete"}
    )
    )
    .addNumberOption(option => option.setName('number').setDescription('The number of the limit').setRequired(true)),
    /**
     *
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        var limit = interaction.options.getString('limit')
        var number = interaction.options.getNumber('number')

        if(interaction.user.id === interaction.guild.ownerId || interaction.user.id === config.Dev.hyron) {
            switch(limit) {
                case 'channelcreate':
                    await db.set(`${interaction.guild.id}_channelcreatelimit`, number);
                    return interaction.reply({ content: `:white_check_mark: The channel create limit has been set to ${number}`, ephemeral: true});
                case 'channeldelete':
                    await db.set(`${interaction.guild.id}_channeldeletelimit`, number);
                    return interaction.reply({ content: `:white_check_mark: The channel delete limit has been set to ${number}`, ephemeral: true});
                case 'rolecreate':
                    await db.set(`${interaction.guild.id}_rolecreatelimit`, number);
                    return interaction.reply({ content: `:white_check_mark: The role create limit has been set to ${number}`, ephemeral: true});
                case 'roledelete':
                    await db.set(`${interaction.guild.id}_roledeletelimit`, number);
                    return interaction.reply({ content: `:white_check_mark: The role delete limit has been set to ${number}`, ephemeral: true});
            }
        } else {
            return interaction.reply({ content: 'This command is for the server owner only.', ephemeral: true});
        }
    }
}

