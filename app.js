const fs            = require('fs');
const Discord       = require('discord.js');
const Client        = new Discord.Client();
const {
    token,
    prefix
}                   = require('./configs/Config.json');

Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    Client.commands.set(command.name, command);
}

Client.once('ready', () => {
    console.log('>> KEYMA.SH Bot is live.');
});

Client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!Client.commands.has(command)) return;

    try {
        Client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

Client.login(token);
