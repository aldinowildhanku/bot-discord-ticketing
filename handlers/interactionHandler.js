const ticketService = require('../services/ticketService');
const { 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle,
    ChannelType,
    PermissionsBitField,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require('discord.js');

module.exports = async (interaction) => {

    if (interaction.isStringSelectMenu()) {

        const category = interaction.values[0];

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`create_ticket_${category}`)
                .setLabel('🎫 Buat Ticket')
                .setStyle(ButtonStyle.Primary)
        );

        return interaction.update({
            content: `Kategori: **${category}**\nKlik tombol untuk membuat ticket`,
            components: [button]
        });
    }

    if (interaction.isButton() && interaction.customId.startsWith('create_ticket_')) {

        const category = interaction.customId.split('_')[2];

        const modal = new ModalBuilder()
            .setCustomId(`modal_ticket_${category}`)
            .setTitle('Buat Ticket');

        const emailInput = new TextInputBuilder()
            .setCustomId('email')
            .setLabel('Masukkan Email Kamu')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('contoh@gmail.com')
            .setRequired(true);

        const row = new ActionRowBuilder().addComponents(emailInput);

        modal.addComponents(row);

        return interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith('modal_ticket_')) {

        try {
            const userId = interaction.user.id;
            const category = interaction.customId.split('_')[2];
            const email = interaction.fields.getTextInputValue('email');

            if (!email.includes('@')) {
                return interaction.reply({
                    content: 'Email tidak valid!',
                    ephemeral: true
                });
            }

            if (await ticketService.hasOpenTicket(userId)) {
                return interaction.reply({
                    content: 'Kamu masih punya ticket terbuka!',
                    ephemeral: true
                });
            }

            const guild = interaction.guild;

            const channel = await guild.channels.create({
                name: `ticket-temp`,
                type: ChannelType.GuildText,
                parent: process.env.CATEGORY_ID,
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: userId,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory
                        ]
                    },
                    {
                        id: process.env.ADMIN_ROLE_ID,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory
                        ]
                    }
                ]
            });

            const ticketNumber = await ticketService.createTicketWithNumber(
                userId,
                channel.id,
                category
            );

            await ticketService.updateEmail(channel.id, email);

            await channel.setName(`ticket-${ticketNumber}`);

            const claimBtn = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('claim_ticket')
                    .setLabel('Claim Ticket')
                    .setStyle(ButtonStyle.Success)
            );

            await interaction.reply({
                content: `✅ Ticket berhasil dibuat: ${channel}`,
                ephemeral: true
            });

            await channel.send({
                content: `Halo <@${userId}> 👋
Email: **${email}**
Nomor Ticket: **${ticketNumber}**
Kategori: **${category}**`,
                components: [claimBtn]
            });

        } catch (err) {
            console.error(err);

            return interaction.reply({
                content: 'Terjadi error saat membuat ticket!',
                ephemeral: true
            });
        }

        return;
    }

    if (interaction.isButton() && interaction.customId === 'claim_ticket') {

        try {
            if (!interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                return interaction.reply({
                    content: 'Khusus admin!',
                    ephemeral: true
                });
            }

            await interaction.deferReply();

            await ticketService.claimTicket(
                interaction.channel.id,
                interaction.user.id
            );

            await interaction.editReply({
                content: `✅ Ticket di-assign admin <@${interaction.user.id}>`
            });

        } catch (err) {
            console.error(err);

            if (!interaction.replied) {
                interaction.reply({
                    content: 'Terjadi error saat assign ticket!',
                    ephemeral: true
                });
            }
        }

        return;
    }
};