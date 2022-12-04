import Discord from "discord.js";
import axios from "axios";
import * as L from "../locale/locales.mjs";
import * as Utils from "../utils/utils.mjs";

export default {
  data: new Discord.SlashCommandBuilder()
    .setDMPermission(false)
    .setName("history")
    .setDescription(L._U("en", "desc_recentlyPlayed")),
  async execute(interaction, client, guildData) {
    if (!guildData.url)
      return interaction.reply({
        content: L._U(guildData.locale, "no_radio_api"),
        ephemeral: true,
      });
    if (!guildData.api)
      return interaction.reply({
        content: L._U(guildData.locale, "no_radio_api"),
        ephemeral: true,
      });
    await interaction.deferReply();
    axios
      .get(guildData.api)
      .then((res) => {
        const recentlyPlayed = new Discord.EmbedBuilder()
          .setColor("#1f8df5")
          .setTitle(
            `${res.data.station.name} - ${L._U(
              guildData.locale,
              "recent_tracks"
            )}`
          );

        var songs = [];
        var formatedSongs = res.data.song_history.slice(0, 5);

        formatedSongs.forEach((song) => {
          songs.push({
            name: Utils.unixConvert(
              song.played_at,
              guildData.timezone
            ).toString(),
            value: song.song.text,
          });
        });

        recentlyPlayed.addFields(songs);

        var currentTime = new Date(
          new Date().toLocaleString("en-US", { timeZone: guildData.timezone })
        );
        recentlyPlayed.setFooter({
          text: `${L._U(
            guildData.locale,
            "generated_at"
          )} ${currentTime.getHours()}:${currentTime.getMinutes()}`,
        });
        interaction.editReply({ embeds: [recentlyPlayed] });
      })
      .catch((err) => {
        console.log(err);
        interaction.editReply(L._U("http_error"));
      });
  },
};
