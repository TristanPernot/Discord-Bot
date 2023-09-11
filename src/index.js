const { Client, GatewayIntentBits } = require('discord.js')

require('dotenv/config')

const PREFIX = '!';

var servers = {};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

client.on('ready', () =>{
    console.log("bot ready")
})

client.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]){
        case 'info':
            if(args[1]){
                message.channel.send("Hello my name is Yuyuko-bot I use the command ! to play, skip, and stop songs")
            }
        
        break;

        case 'play':
            if(args[1]){
                message.channel.send("To play a song I need a link");
                return;
            }
            if(!message.member.voiceChannel){
                message.channel.send("You must be in a channel to play the bot");
                return;
            }

        break;
    }
})

client.login(process.env.TOKEN)