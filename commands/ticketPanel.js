const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketpanel')
        .setDescription('Panel ticket'),

    async execute(interaction) {

        if (!interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
            return interaction.reply({ content: 'Khusus admin!', ephemeral: true });
        }

        const menu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select_category')
                .setPlaceholder('Pilih kategori')
                .addOptions([
                    { label: 'Support', value: 'support' },
                    { label: 'Billing', value: 'billing' },
                    { label: 'Bug', value: 'bug' }
                ])
        );

        interaction.reply({
            content: 'Pilih kategori ticket:',
            components: [menu]
        });
    }
};