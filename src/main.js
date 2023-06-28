const dotenv = require('dotenv');
const path = require('path');
const Discord = require('discord.js');
const { Client, GatewayIntentBits } = Discord;

dotenv.config({ path: path.join(__dirname, '../.env') });

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
  message.delete(1000);

  if (command.includes('twitter.com')) {
    editedUrl = command.replace('twitter.com', 'vxtwitter.com');
  } else if(command.includes('instagram.com')) {
    editedUrl = command.replace('instagram.com', 'ddinstagram.com');
  } else if (command.includes('tiktok.com')) {
    editedUrl = command.replace('tiktok.com', 'tiktxk.com');
  }

  if (editedUrl !== "") {
    const channelId = message.channel.id;
    if (repliedUrls.has(channelId) && repliedUrls.get(channelId).includes(editedUrl)) {
      return;
    }

    return message.reply(editedUrl);
  }
});


client.login(process.env.DISCORD_TOKEN);
