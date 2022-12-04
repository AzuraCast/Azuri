import * as L from "../locale/locales.mjs";
import dv from "@discordjs/voice";
import Discord from "discord.js";

export default {
  data: new Discord.SlashCommandBuilder()
    .setDMPermission(false)
    .setName("leave")
    .setDescription(L._U("en", "desc_leave")),
  async execute(interaction, client, guildData) {
    if (
      !interaction.channel
        .permissionsFor(interaction.member)
        .has(Discord.PermissionsBitField.Flags.ManageGuild)
    ) {
      if (
        process.env.EVERYONE_LEAVE == false ||
        process.env.EVERYONE_LEAVE == "false"
      )
        return interaction.reply({
          content: "❌ - Oh No! You've not got permission to use that!",
          ephemeral: true,
        });
    }

    if (!(await dv.getVoiceConnection(interaction.guild.id)))
      return interaction.reply({
        content: L._U(guildData.locale, "not_connected"),
        ephemeral: true,
      });

    await connection.destroy();

    interaction.reply("👋 Ok, bye");
  },
};
