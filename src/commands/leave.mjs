import * as L from "../locale/locales.mjs";
import dv from "@discordjs/voice";
export default {
  name: "leave",
  aliases: ["l", "exit", "stop", "quit"],
  description: L._U("en", "desc_leave"),
  execute: async (client, guildData, message, ...args) => {
    if (!message.guild)
      return message.channel.send(L._U(guildData.locale, "server_only"));
    if (!(await dv.getVoiceConnection(message.guild.id)))
      return message.channel.send(L._U(guildData.locale, "not_connected"));

    await connection.destroy();

    message.channel.send("👋 Ok, bye");
  },
};
