import * as L from "../locale/locales.mjs";
import Discord from "discord.js";

export default {
  data: new Discord.SlashCommandBuilder()
    .setDMPermission(false)
    .setName("ping")
    .setDescription(L._U("en", "desc_ping")),
  async execute(interaction, client, guildData) {
    interaction.reply(`${L._U(guildData.locale, "ping")} ${client.ws.ping}ms`);
  },
};
