const Discord = require('discord.js');
const Utils = require('../utils/utils');
const axios = require('axios');
const L = require('../locale/locales')

module.exports = {
    name: 'recent',
    aliases: [
        'history',
        'his',
        'songs'
    ],
    description: L._U('en', 'desc_recentlyPlayed'),
    private: false,
    execute: async (client, guildData, message, ...args) => {
        if(!message.guild) return message.reply(L._U(guildData.locale, 'server_only'));

        if(!guildData.url) return message.reply(L._U(guildData.locale, 'no_radio_api'));

        axios.get(guildData.api)
            .then((res) => {
                    const recentlyPlayed = new Discord.MessageEmbed()
                        .setColor('#1f8df5')
                        .setTitle(`${res.data.station.name} - ${L._U(guildData.locale, 'recent_tracks')}`);

                    var songs = [];
                    var formatedSongs = res.data.song_history.slice(0, 5);

                    if(args[0] == 'extra') formatedSongs = res.data.song_history.slice(0, 9);
                    
                    formatedSongs.forEach(song => {
                        songs.push(
                            {
                                name: Utils.unixConvert(song.played_at, guildData.timezone).toString(),
                                value: song.song.text
                            }
                        )
                    });

                    recentlyPlayed.addFields(songs);
                        
                    var currentTime = new Date(new Date().toLocaleString('en-US', { timeZone: guildData.timezone }));
                    recentlyPlayed.setFooter(`${L._U(guildData.locale, 'generated_at')} ${currentTime.getHours()}:${currentTime.getMinutes()}`)
                    message.channel.send(recentlyPlayed);
                })
                .catch((err) => {
                    console.log(err);
                    message.reply(L._U('http_error'));
                })  
    }
}