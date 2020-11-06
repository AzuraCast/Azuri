const Discord = require('discord.js');
const axios = require('axios');
const L = require('../locale/locales')

module.exports = {
    name: 'tuned',
    aliases: [
        'listeners',
        'listenercount',
        'stationinfo'
    ],
    description: L._U('en', 'desc_tuned'),
    private: false,
    execute: async (client, guildData, message, ...args) => {
        if(!message.guild) return message.reply(L._U(guildData.locale, 'server_only'));

        if(!guildData.api) return message.reply(L._U(guildData.locale, 'no_radio_api'));

        axios.get(guildData.api)
            .then((res) => {
                message.reply(`${L._U(guildData.locale, 'currently')} **${res.data.station.name}** ${L._U(guildData.locale, 'has')} **${res.data.listeners.unique}** ${L._U(guildData.locale, 'unique_listeners')}`)
            })
            .catch((err) => {
                console.log(err);
                message.reply(L._U(guildData.locale, 'http_error'));
            })  
    }
}
