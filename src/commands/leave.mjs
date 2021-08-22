import * as L from "../locale/locales.mjs";
import dv from "@discordjs/voice";
export default {
  name: "leave",
  aliases: ["l", "exit", "stop", "quit"],
  description: L._U("en", "desc_leave"),
  execute: async (client, guildData, message, ...args) => {
    if (!message.guild)
      return message.channel.send(L._U(guildData.locale, "server_only"));

    if (
      !message.channel.permissionsFor(message.member).has("MANAGE_GUILD") ||
      !message.channel.permissionsFor(message.member).has("ADMINISTRATOR")
    ) {
      if (
        process.env.EVERYONE_LEAVE == false ||
        process.env.EVERYONE_LEAVE == "false"
      )
        return message.channel.send(
          "❌ - Oh No! You've not got permission to use that!"
        );
    }

    if (!(await dv.getVoiceConnection(message.guild.id)))
      return message.channel.send(L._U(guildData.locale, "not_connected"));

    await connection.destroy();

    message.channel.send("👋 Ok, bye");
  },
};
