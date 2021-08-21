import * as L from "../locale/locales.mjs";

export default {
  name: "stats",
  aliases: ["stat", "info", "botinfo", "bi"],
  description: L._U("en", "desc_stats"),
  private: false,
  execute: async (client, guildData, message, ...args) => {
    return message.channel.send(
      `${L._U(guildData.locale, "bot_is_in")} **${
        client.guilds.cache.size
      }** ${L._U(guildData.locale, "servers_serving")} **${
        client.users.cache.size
      }** ${L._U(guildData.locale, "members")}`
    );
  },
};
