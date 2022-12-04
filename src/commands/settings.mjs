import Discord from "discord.js";
import * as L from "../locale/locales.mjs";
import * as GuildUtils from "../utils/guilds.mjs";
import axios from "axios";

export default {
  data: new Discord.SlashCommandBuilder()
    .setDMPermission(false)
    .setName("settings")
    .addSubcommand((command) =>
      command
        .setName("home")
        .setDescription("Change the default channel")

        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The new default channel")
            .setRequired(false)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("radio")
        .setDescription("Change the radio url")

        .addStringOption((option) =>
          option.setName("url").setDescription("The new radio url")
        )
    )
    .addSubcommand((command) =>
      command
        .setName("api")
        .setDescription("Change the api url")

        .addStringOption((option) =>
          option.setName("url").setDescription("The new api url")
        )
    )
    .addSubcommand((command) =>
      command
        .setName("timezone")
        .setDescription("Change the timezone")

        .addStringOption((option) =>
          option.setName("timezone").setDescription("The new timezone")
        )
    )
    .setDefaultMemberPermissions(Discord.PermissionsBitField.Flags.ManageGuild)
    .setDescription(L._U("en", "desc_settings")),
  async execute(interaction, client, serverData) {
    switch (interaction.options._subcommand) {
      case "home":
        if (interaction.options._hoistedOptions[0]) {
          if (interaction.options._hoistedOptions[0].channel.type !== 2)
            return interaction.reply({
              content: L._U(serverData.locale, "channel_not_voice"),
              ephemeral: true,
            });

          serverData.home = interaction.options._hoistedOptions[0].channel.id;
          GuildUtils.writeForGuild(serverData);

          console.log(
            `Changed Home room for ${interaction.guild.name} (${interaction.guild.id}) to ${interaction.options._hoistedOptions[0].channel.id}`
          );

          return interaction.reply(`📫 ${L._U(serverData.locale, "set")}!`);
        } else {
          if (!serverData.home) serverData.home = "Not set";
          else serverData.home = "<#" + serverData.home + ">";
          return interaction.reply({
            content: `${L._U(serverData.locale, "current_homeroom")}: ${
              serverData.home
            }`,
            ephemeral: true,
          });
        }
        break;

      case "api":
        if (interaction.options._hoistedOptions[0]) {
          serverData.api = interaction.options._hoistedOptions[0].value;

          return axios
            .get(serverData.api)
            .then((response) => {
              if (response.data.station) {
                if (!serverData.url) {
                  serverData.url = response.data.station.listen_url;
                }

                GuildUtils.writeForGuild(serverData);

                console.log(
                  `Changed API URL for ${interaction.guild.name} (${interaction.guild.id}) to ${interaction.options._hoistedOptions[0].value}`
                );
              } else {
                return interaction.reply({
                  content:
                    "API Response did not contain AzuraCast API content.",
                  ephemeral: true,
                });
              }

              return interaction.reply(`📫 ${L._U(serverData.locale, "set")}!`);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          if (!serverData.api) serverData.api = "Not set";
          return interaction.reply({
            content: `${L._U(serverData.locale, "currnet_api")}: ${
              serverData.api
            }`,
            ephemeral: true,
          });
        }
        break;

      case "radio":
        if (interaction.options._hoistedOptions[0]) {
          serverData.url = interaction.options._hoistedOptions[0].value;
          GuildUtils.writeForGuild(serverData);

          console.log(
            `Changed Radio URL for ${interaction.guild.name} (${interaction.guild.id}) to ${interaction.options._hoistedOptions[0].value}`
          );
          return interaction.reply(`📫 ${L._U(serverData.locale, "set")}!`);
        } else {
          return interaction.reply({
            content: `${L._U(serverData.locale, "current_radio_url")}: ${
              serverData.url
            }`,
            ephemeral: true,
          });
        }
        break;

      case "timezone":
        if (interaction.options._hoistedOptions[0]) {
          serverData.timezone = interaction.options._hoistedOptions[0].value;
          GuildUtils.writeForGuild(serverData);

          console.log(
            `Changed Timezone for ${interaction.guild.name} (${interaction.guild.id}) to ${interaction.options._hoistedOptions[0].value}`
          );

          return interaction.reply(`📫 ${L._U(serverData.locale, "set")}!`);
        } else {
          return interaction.reply({
            content: `${L._U(serverData.locale, "current_timezone")}: ${
              serverData.timezone
            } | ${L._U(
              serverData.locale,
              "full_list_timezone"
            )} <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>`,
            ephemeral: true,
          });
        }
        break;
    }
  },
};
