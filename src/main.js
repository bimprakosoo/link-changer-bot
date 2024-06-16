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
let editedUrl = "";
let ddDisabled = true;

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const command = message.content;

  if (command === '!enable dd') {
    ddEnabled = true;
    await message.reply('ddinstagram has been enabled.');
    return;
  }

  if (command === '!disable dd') {
    ddEnabled = false;
    await message.reply('ddinstagram has been disabled.');
    return;
  }

  if (command.includes('twitter.com') && command.includes('.mp4')) {
    return;
  } else if (command.startsWith('!ignore')) {
    return;
  }

  if (command.includes('twitter.com') || command.includes('x.com')) {
    editedUrl = command.replace(/twitter\.com|x\.com/, 'vxtwitter.com');  
  } else if(command.includes('instagram.com') && ddDisabled) {
    editedUrl = command.replace('instagram.com', 'ddinstagram.com');
  } else if (command.includes('9gag') && command.includes('av1.mp4')) {
    editedUrl = command.replace(/av1\.mp4$/, '.mp4');
  }

  if (editedUrl !== "") {
    const channelId = message.channel.id;
    if (repliedUrls.has(channelId) && repliedUrls.get(channelId).includes(editedUrl)) {
      return;
    }

    const userMention = `<@${message.author.id}>`;
    const replyMessage = await message.reply({ content: `${editedUrl}`, allowedMentions: { repliedUser: false } });
    await message.suppressEmbeds(true);

    if(repliedUrls.has(channelId)) {
      repliedUrls.get(channelId).push(editedUrl);
    } else {
      repliedUrls.set(channelId, [editedUrl]);
    }
  }
});


client.login(process.env.DISCORD_TOKEN);
