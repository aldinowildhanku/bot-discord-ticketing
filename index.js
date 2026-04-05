require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const ticketPanel = require('./commands/ticketPanel');
const closeTicket = require('./commands/closeTicket');
const interactionHandler = require('./handlers/interactionHandler');
const readyEvent = require('./events/ready');

const commands = [
    ticketPanel.data.toJSON(),
    closeTicket.data.toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
    );
})();

client.once('ready', () => readyEvent(client));

client.on('interactionCreate', async (interaction) => {

    if (interaction.isChatInputCommand()) {

        if (interaction.commandName === 'ticketpanel') {
            return ticketPanel.execute(interaction);
        }

        if (interaction.commandName === 'closeticket') {
            return closeTicket.execute(interaction);
        }
    }

    // handle button & select
    interactionHandler(interaction);
});

// login
client.login(process.env.TOKEN);