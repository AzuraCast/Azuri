import axios from "axios";
import * as L from "../locale/locales.mjs";
import Discord from "discord.js";

export default {
  data: new Discord.SlashCommandBuilder()
    .setDMPermission(false)
    .setName("listeners")
    .setDescription(L._U("en", "desc_tuned")),
  async execute(interaction, client, guildData) {
    if (!interaction.guild)
      return interaction.reply({
        content: L._U(guildData.locale, "server_only"),
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
        interaction.editReply(
          `${L._U(guildData.locale, "currently")} **${
            res.data.station.name
          }** ${L._U(guildData.locale, "has")} **${
            res.data.listeners.unique
          }** ${L._U(guildData.locale, "unique_listeners")}`
        );
      })
      .catch((err) => {
        console.log(err);
        interaction.editReply(L._U(guildData.locale, "http_error"));
      });
  },
};
