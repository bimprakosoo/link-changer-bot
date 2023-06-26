require('dotenv').config();
const Discord = require('discord.js');
const { Client, GatewayIntentBits } = Discord;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

const repliedUrls = new Map();
client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  const command = message.content;
  let editedUrl = "";

  if (command.includes('twitter.com')) {
    editedUrl = command.replace('twitter.com', 'vxtwitter.com');
  }

  if (editedUrl !== "") {
    const channelId = message.channel.id;
    if (repliedUrls.has(channelId) && repliedUrls.get(channelId).includes(editedUrl)) {
      return;
    }

    return message.reply(editedUrl);
  }
  // }
});


client.login(process.env.DISCORD_TOKEN);
