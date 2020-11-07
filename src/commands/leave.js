const voice = require('./join');
const L = require('../locale/locales')

module.exports = {
    name: 'leave',
    aliases: [
        'l',
        'exit',
        'stop',
        'quit'
    ],
    description: L._U('en', 'desc_leave'),
    execute: async (client, guildData, message, ...args) => {
        if(!message.guild) return message.reply(L._U(guildData.locale, 'server_only'));
        if(!voice.connection) return message.reply(L._U(guildData.locale, 'not_connected'));

        if(voice.dispatcher) await voice.dispatcher.destroy();

        await message.guild.voice.channel.leave();

        message.reply("👋");
    }
}