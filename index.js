import cron from 'node-cron';

import { Client, GatewayIntentBits, Partials, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

import * as Commands from './commands.js'

const prefix = '!';
const welChannel = process.env.WELCH;
const introChannel = process.env.INTROCH;
const roleChannel = process.env.ROLESCH;
const botChannel = process.env.BOTCH;
const rafChannel = process.env.RAFCH;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    Commands.reactionRoles(client);
});

cron.schedule('0 20 0,6,12,18 * * *', function(){
    console.log('WB Notification sending...');
    const channel = client.channels.cache.get(botChannel);
    if (!channel) {
        return console.log("Could not find channel")
    }
    Commands.worldBoss(client);
});

cron.schedule('0 50 0,6,12,18 * * *', function(){
    console.log('FB Notification sending...');
    const channel = client.channels.cache.get(botChannel);
    if (!channel) {
        return console.log("Could not find channel")
    }
    Commands.fieldBoss(client);
});

cron.schedule('0 20 1,7,13,19 * * *', function(){
    console.log('CB Notification sending...');
    const channel = client.channels.cache.get(botChannel);
    if (!channel) {
        return console.log("Could not find channel")
    }
    Commands.chaosBoss(client);
});

cron.schedule('0 30 16 * * 1', function(){
    console.log('Monday GE Notification sending...');
    const channel = client.channels.cache.get(botChannel);
    if (!channel) {
        return console.log("Could not find channel")
    }
    Commands.guildEvent(client);
});

cron.schedule('0 0 17 * * 3', function(){
    console.log('Wednesday GE Notification sending...');
    const channel = client.channels.cache.get(botChannel);
    if (!channel) {
        return console.log("Could not find channel")
    }
    Commands.guildEvent(client);
});

cron.schedule('0 0 18 * * 6', function(){
    console.log('Saturday GE Notification sending...');
    const channel = client.channels.cache.get(botChannel);
    if (!channel) {
        return console.log("Could not find channel")
    }
    Commands.guildEvent(client);
});

client.on('guildMemberAdd', (member) => {
    member.guild.channels.cache.get(welChannel).send('Welcome ' + member.toString() + ' to the guild discord! Go to ' + member.guild.channels.cache.get(introChannel).toString() + ' and tell us a little about yourself!');
});

client.on('messageCreate', (message) => {
    if (message.channelId !== rafChannel) return;
    if (!message.content.startsWith(prefix) && !message.author.bot){
        message.reply("This channel is for bot commands only! For a list of commands type '!help'");
        return;
    }
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        Commands.ping(message);
    }
    if (command === 'raffle'){
        if (!message.member.permissions.has('BanMembers')){
            message.reply('You do not have permission to use this command!');
        }
        else{
            Commands.raffle(client);
        }
    }
});