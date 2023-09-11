const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv/config');
const PREFIX = '!';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const ytdl = require("ytdl-core-discord"); // Use ytdl-core-discord for FFmpeg support

const servers = new Map();

client.once('ready', () => {
    console.log("Bot ready");
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    let server = servers.get(message.guild.id);

    if (!server) {
        servers.set(message.guild.id, {
            queue: [],
            dispatcher: null,
        });
        server = servers.get(message.guild.id);
    }

    switch (command) {
        case 'info':
            message.channel.send("Hello, my name is Yuyuko-bot. I use the command ! to play and skip songs.");
            break;

        case 'play':
            if (args.length === 0) {
                message.channel.send("To play a song, you need to provide a link.");
                return;
            }

            const memberVoiceChannel = message.member.voice.channel;

            if (!memberVoiceChannel) {
                message.channel.send("You must be in a voice channel to use this command.");
                return;
            }

            server.queue.push(args[0]);

            if (!server.dispatcher) {
                const connection = await memberVoiceChannel.join();
                play(connection, message);
            }
            break;
    }
});

async function play(connection, message) {
    const server = servers.get(message.guild.id);

    server.dispatcher = connection.play(await ytdl(server.queue[0]), { type: 'opus' });

    server.dispatcher.on("finish", () => {
        server.queue.shift();
        if (server.queue[0]) {
            play(connection, message);
        } else {
            connection.disconnect();
            server.dispatcher = null;
        }
    });
}

client.login(process.env.TOKEN);
