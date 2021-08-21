import * as L from "../locale/locales.mjs";

export default {
  name: "ping",
  description: L._U("en", "desc_ping"),
  private: false,
  execute: async (client, guildData, message, ...args) => {
    message.channel.send(
      `${L._U(guildData.locale, "ping")} ${client.ws.ping}ms`
    );
  },
};
