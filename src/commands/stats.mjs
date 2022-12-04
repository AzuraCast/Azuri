import * as L from "../locale/locales.mjs";
import Discord from "discord.js";

export default {
  data: new Discord.SlashCommandBuilder()
    .setDMPermission(false)
    .setName("stats")
    .setDescription(L._U("en", "desc_stats")),
  async execute(interaction, client, guildData) {
    return interaction.reply(
      `${L._U(guildData.locale, "bot_is_in")} **${
        client.guilds.cache.size
      }** ${L._U(guildData.locale, "servers_serving")} **${
        client.users.cache.size
      }** ${L._U(guildData.locale, "members")}`
    );
  },
};
