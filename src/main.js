const dotenv = require('dotenv');
const path = require('path');
const Discord = require('discord.js');
const repl = require("repl");
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
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const command = message.content;
  let editedUrl = "";

  if (command.includes('twitter.com')) {
    editedUrl = command.replace('twitter.com', 'vxtwitter.com');
  } else if(command.includes('instagram.com')) {
    editedUrl = command.replace('instagram.com', 'ddinstagram.com');
  } else if (command.includes('tiktok.com')) {
    editedUrl = command.replace('tiktok.com', 'tiktxk.com');
  } else if (command.includes('9gag') && command.endsWith('av1.mp4')) {
    editedUrl = command.replace(/av1\.mp4$/, '.mp4');
  }

  if (editedUrl !== "") {
    const channelId = message.channel.id;
    if (repliedUrls.has(channelId) && repliedUrls.get(channelId).includes(editedUrl)) {
      return;
    }

    const userMention = `<@${message.author.id}>`;
    const replyMessage = await message.reply(`From ${userMention}: ${editedUrl}`);
    await message.suppressEmbeds(true);

    if(repliedUrls.has(channelId)) {
      repliedUrls.get(channelId).push(editedUrl);
    } else {
      repliedUrls.set(channelId, [editedUrl]);
    }
  }
});


client.login(process.env.DISCORD_TOKEN);
