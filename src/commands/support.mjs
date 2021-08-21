import Discord from "discord.js";
import * as L from "../locale/locales.mjs";

export default {
  name: "support",
  aliases: ["ticket", "invite", "vote"],
  description: L._U("en", "desc_support"),
  private: false,
  execute: async (client, guildData, message, ...args) => {
    const supportEmbed = new Discord.MessageEmbed()
      .setColor("#1f8df5")
      .setTitle(`Azuri ${L._U(guildData.locale, "support")}`)
      .addFields(
        {
          name: "Discord",
          value: "https://www.azuracast.com/discord",
          inline: true,
        },
        {
          name: `${L._U(guildData.locale, "website")}`,
          value: "https://www.azuracast.com/",
          inline: true,
        },
        {
          name: `${L._U(guildData.locale, "invite")}`,
          value:
            "https://discord.com/api/oauth2/authorize?client_id=773671716529504267&permissions=3411008&scope=bot",
        }
      )
      .setTimestamp();

    message.channel.send({ embeds: [supportEmbed] });
  },
};
