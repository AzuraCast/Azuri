import Discord from "discord.js";
import axios from "axios";
import * as L from "../locale/locales.mjs";

export default {
  data: new Discord.SlashCommandBuilder()
    .setDMPermission(false)
    .setName("nowplaying")
    .setDescription(L._U("en", "desc_nowPlaying")),
  async execute(interaction, client, guildData) {
    if (!interaction.guild)
      return interaction.reply({
        content: L._U(guildData.locale, "server_only"),
        ephemeral: true,
      });

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
    await axios
      .get(guildData.api)
      .then((res) => {
        const nowPlayingEmbed = new Discord.EmbedBuilder()
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

        interaction.editReply({ content: "", embeds: [nowPlayingEmbed] });
      })
      .catch((err) => {
        interaction.editReply({
          content: L._U(guildData.locale, "http_error"),
          ephemeral: true,
        });
      });
  },
};
