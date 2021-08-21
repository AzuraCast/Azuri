import Discord from "discord.js";
import axios from "axios";
import * as L from "../locale/locales.mjs";

export default {
  name: "playing",
  aliases: ["np", "nowplaying", "current", "song"],
  private: false,
  description: L._U("en", "desc_nowPlaying"),
  execute: async (client, guildData, message, ...args) => {
    if (!message.guild)
      return message.channel.send(L._U(guildData.locale, "server_only"));

    if (!guildData.url)
      return message.channel.send(L._U(guildData.locale, "no_radio_api"));
    if (!guildData.api)
      return message.channel.send(L._U(guildData.locale, "no_radio_api"));

    axios
      .get(guildData.api)
      .then((res) => {
        const nowPlayingEmbed = new Discord.MessageEmbed()
          .setColor("#1f8df5")
          .setTitle(
            `${res.data.station.name} - ${L._U(
              guildData.locale,
              "now_playing"
            )}`
          )
          .addFields({
            name: res.data.now_playing.song.artist,
            value: res.data.now_playing.song.title,
          })
          .setThumbnail(res.data.now_playing.song.art)
          .setTimestamp();
        message.channel.send({ embeds: [nowPlayingEmbed] });
      })
      .catch((err) => {
        console.log(err);
        message.channel.send(L._U("http_error"));
      });
  },
};
