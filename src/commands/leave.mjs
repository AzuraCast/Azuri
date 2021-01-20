import voice from './join.mjs';
import * as L from '../locale/locales.mjs';

export default {
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
};