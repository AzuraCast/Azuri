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
          value: "https://discord.com/invite/5t3KaGX8Bx",
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
            "https://discord.com/oauth2/authorize?client_id=814434268762603551&permissions=0&scope=bot",
        }
      )
      .setTimestamp();

    message.channel.send({ embeds: [supportEmbed] });
  },
};
