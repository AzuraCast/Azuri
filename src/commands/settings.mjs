import Discord from "discord.js";
import * as L from "../locale/locales.mjs";
import * as GuildUtils from "../utils/guilds.mjs";
import axios from "axios";

export default {
  name: "settings",
  aliases: ["setting", "config", "s"],
  description: L._U("en", "desc_settings"),
  execute: (client, serverData, message, ...args) => {
    if (!message.guild)
      return message.channel.send(L._U(serverData.locale, "server_only"));
    if (!args.length)
      return message.channel.send(L._U(serverData.locale, "missing_args"));
    if (
      !message.channel.permissionsFor(message.member).has("MANAGE_GUILD") ||
      !message.channel.permissionsFor(message.member).has("ADMINISTRATOR")
    )
      return message.channel.send(
        "❌ - Oh No! You've not got permission to use that!"
      );

    switch (args[0][0]) {
      case "home":
        if (args[0][1]) {
          let channel = client.channels.cache.get(args[0][1]);

          if (!channel)
            return message.channel.send(
              L._U(serverData.locale, "no_find_voice")
            );
          if (channel.type !== "GUILD_VOICE")
            return message.channel.send(
              L._U(serverData.locale, "channel_not_voice")
            );

          serverData.home = channel.id;
          GuildUtils.writeForGuild(serverData);

          console.log(
            `Changed Home room for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`
          );

          return message.channel.send(`📫 ${L._U(serverData.locale, "set")}!`);
        } else {
          return message.channel.send(
            `${L._U(serverData.locale, "current_homeroom")}: ${serverData.home}`
          );
        }
        break;

      case "prefix":
        if (args[0][1]) {
          serverData.prefix = args[0][1];
          GuildUtils.writeForGuild(serverData);

          console.log(
            `Changed Prefix for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`
          );

          return message.channel.send(`📫 ${L._U(serverData.locale, "set")}!`);
        } else {
          return message.channel.send(
            `${L._U(serverData.locale, "current_prefix")}: ${serverData.preifx}`
          );
        }
        break;

      case "api":
        if (args[0][1]) {
          serverData.api = args[0][1];

          return axios
            .get(serverData.api)
            .then((response) => {
              if (response.data.station) {
                if (!serverData.url) {
                  serverData.url = response.data.station.listen_url;
                }

                GuildUtils.writeForGuild(serverData);

                console.log(
                  `Changed API URL for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`
                );
              } else {
                console.error(
                  "API Response did not contain AzuraCast API content."
                );
              }

              return message.channel.send(
                `📫 ${L._U(serverData.locale, "set")}!`
              );
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          return message.channel.send(
            `${L._U("serverData.locale, current_api")}: ${serverData.api}`
          );
        }
        break;

      case "url":
        if (args[0][1]) {
          serverData.url = args[0][1];
          GuildUtils.writeForGuild(serverData);

          console.log(
            `Changed Radio URL for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`
          );
          return message.channel.send(`📫 ${L._U(serverData.locale, "set")}!`);
        } else {
          return message.channel.send(
            `${L._U(serverData.locale, "current_radio_url")}: ${serverData.url}`
          );
        }
        break;

      case "locale":
        if (args[0][1]) {
          switch (args[0][1]) {
            case "avaiable":
              const availableLocalesEmbed = new Discord.MessageEmbed()
                .setColor("#1f8df5")
                .setTitle(
                  `Azuri - ${L._U(serverData.locale, "valid_translation")}`
                )
                .setDescription(L.getAvailableLocales())
                .setTimestamp();

              return message.channel.send({ embeds: [availableLocalesEmbed] });
              break;

            default:
              serverData.locale = args[0][1].toLowerCase();
              if (!L.isValidLocale(serverData.locale))
                return message.channel.send(
                  `${L._U(serverData.locale, "missing_args")}`
                );
              GuildUtils.writeForGuild(serverData);

              console.log(
                `Changed Locale for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`
              );
              return message.channel.send(
                `📫 ${L._U(serverData.locale, "set")}!`
              );
              break;
          }
        } else {
          return message.channel.send(
            `${L._U(serverData.locale, "current_locale")}: \`${
              serverData.locale
            }\``
          );
        }
        break;

      case "timezone":
        if (args[0][1]) {
          serverData.timezone = args[0][1];
          GuildUtils.writeForGuild(serverData);

          console.log(
            `Changed Timezone for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`
          );

          return message.channel.send(`📫 ${L._U(serverData.locale, "set")}!`);
        } else {
          return message.channel.send(
            `${L._U(serverData.locale, "current_timezone")}: ${
              serverData.timezone
            } | ${L._U(
              serverData.locale,
              "full_list_timezone"
            )} <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>`
          );
        }
        break;

      case "permission":
        if (args[0][1]) {
          if (
            !(
              client.commands.get(args[0][2]) ||
              client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(args[0][2])
              )
            )
          )
            return message.channel.send(
              L._U(serverData.locale, "no_find_command")
            );
          if (args[0][1] == "role") {
            if (
              message.guild.roles.cache.filter((role) => role.id === args[0][3])
            ) {
              if (!serverData.commands[args[0][2]]) {
                serverData.commands[args[0][2]] = {};
              }

              serverData.commands[args[0][2]].type = "role";
              serverData.commands[args[0][2]].id = args[0][3];

              console.log(
                `Changed Permission for ${args[0][2]} to role w/ id on ${args[0][3]} ${message.guild.name} (${message.guild.id})`
              );
            } else {
              return message.channel.send(
                L._U(serverData.locale, "no_find_role")
              );
            }
          } else if (args[0][1] == "user") {
            if (message.guild.members.cache.get(args[0][3])) {
              if (!serverData.commands[args[0][2]]) {
                serverData.commands[args[0][2]] = {};
              }

              serverData.commands[args[0][2]].type = "user";
              serverData.commands[args[0][2]].id = args[0][3];

              console.log(
                `Changed Permission for ${args[0][2]} to user w/ id on ${args[0][3]} ${message.guild.name} (${message.guild.id})`
              );
            } else {
              return message.channel.send(
                L._U(serverData.locale, "no_find_user")
              );
            }
          } else if (args[0][1] == "permission") {
            if (
              message.guild.users.cache.filter((user) => user.id === args[0][3])
            ) {
              if (!serverData.commands[args[0][2]]) {
                serverData.commands[args[0][2]] = {};
              }

              serverData.commands[args[0][2]].type = "permission";
              serverData.commands[args[0][2]].permission = args[0][3];

              console.log(
                `Changed Permission for ${args[0][2]} to permission on ${args[0][3]} ${message.guild.name} (${message.guild.id})`
              );
            } else {
              return message.channel.send(
                L._U(serverData.locale, "no_find_user")
              );
            }
          }
        } else {
          return message.channel.send(L._U(serverData.locale, "missing_args"));
        }

        GuildUtils.writeForGuild(serverData);

        return message.channel.send(`📫 ${L._U(serverData.locale, "set")}!`);
        break;

      default:
        let prefix = serverData.prefix
          ? serverData.prefix
          : process.env.DEFAULT_PREFIX;

        const settingEmbed = new Discord.MessageEmbed()
          .setColor("#1f8df5")
          .setTitle(`Azuri - ${L._U(serverData.locale, "setting")}`)
          .addFields(
            {
              name: `${prefix}settings home \`<id>\``,
              value: "Setup home room",
            },
            {
              name: `${prefix}settings url \`<url>\``,
              value: "Setup radio url",
            },
            {
              name: `${prefix}settings api \`<url>\``,
              value: "Setup api url",
            },
            {
              name: `${prefix}settings timezone \`<timezone>\``,
              value: "Setup server timezone",
            },
            {
              name: `${prefix}settings permission \`<role/user/permission>\` \`<command>\` \`<id>\``,
              value: "Set permissions bound to commands",
            },
            {
              name: `${prefix}settings prefix \`<prefix>\``,
              value: "Setup server bot commands prefix",
            },
            {
              name: `${prefix}settings locale \`<avaiable/locale code>\``,
              value: "Set server locale",
            }
          )
          .setTimestamp();

        message.channel.send({ embeds: [settingEmbed] });
        break;
    }
  },
};
