const { SlashCommandBuilder } = require('discord.js');
const ticketService = require('../services/ticketService');
const transcriptService = require('../services/transcriptService');
const emailService = require('../services/emailService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('closeticket')
        .setDescription('Close ticket')
        .addIntegerOption(opt =>
            opt
                .setName('nomor')
                .setDescription('Nomor ticket')
                .setRequired(true)
        ),

    async execute(interaction) {

        try {
            if (!interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                return interaction.reply({
                    content: 'Khusus admin!',
                    ephemeral: true
                });
            }

            await interaction.deferReply({ ephemeral: true });

            const nomor = interaction.options.getInteger('nomor');
            const ticket = await ticketService.getTicketByNumber(nomor);

            if (!ticket) {
                return interaction.editReply({
                    content: 'Ticket tidak ditemukan!'
                });
            }

            const channel = interaction.guild.channels.cache.get(ticket.channel_id);

            if (!channel) {
                return interaction.editReply({
                    content: 'Channel ticket tidak ditemukan!'
                });
            }

            const file = await transcriptService.createTranscript(channel, nomor);

            if (ticket.email) {
                try {
                    await emailService.sendTranscript(
                        ticket.email,
                        nomor,
                        file
                    );
                    console.log('Email berhasil dikirim');
                } catch (emailErr) {
                    console.error('Gagal kirim email:', emailErr);
                }
            } else {
                console.log('Email tidak tersedia');
            }

            const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);

            if (logChannel) {
                await logChannel.send({
                    content: `📁 Ticket Closed\nNomor: ${nomor}\nUser: <@${ticket.user_id}>`,
                    files: [file]
                });
            }

            await ticketService.closeTicket(nomor);

            await interaction.editReply({
                content: `✅ Ticket ${nomor} berhasil ditutup`
            });
            
            setTimeout(async () => {
                try {
                    await channel.delete();
                } catch (err) {
                    console.error('Gagal delete channel:', err);
                }
            }, 5000);

        } catch (err) {
            console.error('ERROR CLOSE TICKET:', err);

            if (!interaction.replied) {
                interaction.reply({
                    content: 'Terjadi error saat close ticket!',
                    ephemeral: true
                });
            }
        }
    }
};