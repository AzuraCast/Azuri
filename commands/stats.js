const L = require('../locale/locales')
const voice = require('./join');

module.exports = {
    name: 'stats',
    aliases: [
        'stat',
        'info',
        'botinfo',
        'bi'
    ],
    description: L._U('en', 'desc_stats'),
    private: false,
    execute: async (client, guildData, message, ...args) => {
        return message.reply(`${L._U(guildData.locale, 'bot_is_in')} **${client.guilds.cache.size}** ${L._U(guildData.locale, 'servers_serving')} **${client.users.cache.size}** ${L._U(guildData.locale, 'members')}`);
    }
}