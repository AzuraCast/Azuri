import Discord from "discord.js";
import * as L from "../locale/locales.mjs";

export default {
  data: new Discord.SlashCommandBuilder()
    .setDMPermission(false)
    .setName("support")
    .setDescription(L._U("en", "desc_support")),
  async execute(interaction, client, guildData) {
    const supportEmbed = new Discord.EmbedBuilder()
      .setColor("#1f8df5")
      .setTitle(`Azuri ${L._U(guildData.locale, "support")}`)
      .setDescription(
        `[Discord](https://discord.com/invite/5t3KaGX8Bx)\n\n[Website](https://www.azuracast.com/)\n\n[Invite the bot](https://discord.com/oauth2/authorize?client_id=814434268762603551&permissions=0&scope=bot)`
      )
      .setTimestamp();

    interaction.reply({ embeds: [supportEmbed], ephemeral: true });
  },
};
