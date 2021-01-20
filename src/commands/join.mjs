import * as L from '../locale/locales.mjs';

let connection, dispatcher, radioURL, voiceChannel;

export default {
    name: 'join',
    aliases: [
        'j',
        'play',
        'start'
    ],
    description: L._U('en', 'desc_join'),
    execute: async (client, guildData, message, ...args) => {
        if(message === 'botHomeRoom') {
            radioURL = guildData.url;
            voiceChannel = guildData.home; 

            let channel = client.channels.cache.get(guildData.home);
            try {
                connection = await channel.join();
            } catch (e) {
                return message.reply(L._U(guildData.locale, 'no_join'));
            }
    
            try {
                dispatcher = connection.play(radioURL);  
            } catch (e) {
                message.reply(L._U(guildData.locale, 'stream_error'));
            }
            return;
        }

        if(!message.guild) return message.reply(L._U(guildData.locale, 'server_only'));
        if(!guildData.url) return message.reply(L._U(guildData.locale, 'no_radio_url'));

        if(args[0][0] === 'home') {
            if(!guildData.home) return message.reply(L._U(guildData.locale, 'no_home_room'));
            
            let channel = client.channels.cache.get(guildData.home);

            if(!channel) return message.reply(L._U(guildData.locale, 'no_find_voice'))

            radioURL = guildData.url;  
            voiceChannel = channel;
        } else if (args[0][0] === 'test') {
            if(!message.member.voice.channel) return message.reply(L._U(guildData.locale, 'no_find_voice'));

            message.reply("Playing testing audio!")

            radioURL = './audio/template.mp3';
            voiceChannel = message.member.voice.channel; 
        } else {
            if(!message.member.voice.channel) return message.reply(L._U(guildData.locale, 'no_find_voice'));

            radioURL = guildData.url;
            voiceChannel = message.member.voice.channel; 
        }

        try {
            connection = await voiceChannel.join();
        } catch (e) {
            return message.reply(L._U(guildData.locale, 'no_join'));
        };

        try {
            dispatcher = connection.play(radioURL);  
        } catch (e) {
            message.reply(L._U(guildData.locale, 'stream_error'));
        }
    }
};
