const Discord = require('discord.js');
const axios = require('axios');
const L = require('../locale/locales');
require('dotenv').config();
const env = process.env;

module.exports = {
    name: 'help',
    aliases: [
        'h'
    ],
    private: false,
    description: L._U('en', 'desc_help'),
    execute: async (client, guildData, message, ...args) => {
        if(args[0][0]) {

        } else {
            commands = [];
            client.commands.forEach(command => {
                if(command.devOnly) return; 
                
                aliases = '';
                
                if(command.aliases) {
                    command.aliases.forEach(alias => {
                        aliases += ' `' + alias + '` ';
                    })
                }
                
                commands.push({
                    name: `${command.name}${aliases}`,
                    value: command.description
                })
            });
            const commandsEmbed = new Discord.MessageEmbed()
                .setColor('#1f8df5')
                .setTitle(`Azuri - ${L._U(guildData.locale, 'help')}`)
                .addFields(commands)
                .setFooter(`${L._U(guildData.locale, 'created_by')} Ninja#4321 - Server Prefix \`${guildData.preifx ? guildData.preifx : env.DEFAULT_PREFIX}\``);

                
            try {
                message.author.send(commandsEmbed);
                message.react('📫');
            } catch {
                message.channel.send(commandsEmbed)
            }
        }

    }
}
