const Discord   = require('discord.js');
const fetch     = require('node-fetch');
const { api }   = require('../configs/Config.json');

module.exports = {
    name: 'user',
    description: 'Grabs information regarding a Keyma.sh Account.',
    async execute(message, args) {
        if (!args.length)
            return message.channel.send("You must supply a username to search!");


        if (args[0] && !args[0].includes('-'))
            return message.channel.send("Improperly formatted username (ie: GNiK-8712)");

        const results = await fetch(`${api.user}?name=${args[0].trim()}&limit=1`).then((response) => response.json());
        if (results && results[0]) {
            const userEmbed = new Discord.MessageEmbed()
                .setColor('#FB923C')
                .setAuthor((args[0].trim().replace('-', '#')), results[0].userAvatar)
                .setDescription(results[0].userDescription)
                .addFields(
            { name: 'Level', value: (results[0].Level.Index || 1)},
                    { name: 'Experience', value: results[0].Experience.toLocaleString()},
                    { name: 'Highest WPM', value: `${results[0].maxWPM.toFixed(2)}`},
                    { name: 'Highest EXP', value: `${results[0].maxEXP.toFixed(2)}`},
                    { name: 'Won', value: `${results[0].CasualMatchesWon.toLocaleString()}`, inline: true},
                    { name: 'Lost', value: `${results[0].CasualMatchesLost.toLocaleString()}`, inline: true},
                    { name: 'Quit', value: `${results[0].CasualMatchesQuit.toLocaleString()}`, inline: true},
                )

            message.channel.send(userEmbed);
        } else
            return message.channel.send('Unable to find user, please try again!');
    },
};