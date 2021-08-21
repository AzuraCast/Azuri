import Discord from "discord.js";
import * as L from "../locale/locales.mjs";

export default {
  name: "help",
  aliases: ["h"],
  private: false,
  description: L._U("en", "desc_help"),
  execute: async (client, guildData, message, ...args) => {
    let commands = [];
    client.commands.forEach((command) => {
      if (command.devOnly) return;

      let aliases = "";

      if (command.aliases) {
        command.aliases.forEach((alias) => {
          aliases += " `" + alias + "` ";
        });
      }

      commands.push({
        name: `${command.name}${aliases}`,
        value: command.description,
      });
    });

    const commandsEmbed = new Discord.MessageEmbed()
      .setColor("#1f8df5")
      .setTitle(`Azuri - ${L._U(guildData.locale, "help")}`)
      .addFields(commands)
      .setFooter(
        `${L._U(guildData.locale, "created_by")} Ninja#4321 - Server Prefix ${
          guildData.preifx ? guildData.preifx : process.env.DEFAULT_PREFIX
        }`
      );

    try {
      message.author.send({ embeds: [commandsEmbed] });
      message.react("📫");
    } catch {
      message.channel.send({ embeds: [commandsEmbed] });
    }
  },
};
