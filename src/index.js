const { Client, GatewayIntentBits } = require('discord.js')

require('dotenv/config')

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

client.login(process.env.TOKEN)