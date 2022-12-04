import dotenv from "dotenv";
import Discord from "discord.js";
import fs from "fs";
import * as Utils from "./utils/utils.mjs";
import * as GuildUtils from "./utils/guilds.mjs";
import voiceCtl from "./commands/join.mjs";

dotenv.config();
let intents = [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.MessageContent,
  Discord.GatewayIntentBits.GuildMembers,
  Discord.GatewayIntentBits.GuildVoiceStates,
];
const client = new Discord.Client({
  autoReconnect: true,
  intents,
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".mjs"));

commandFiles.forEach(async (file) => {
  let commandObj = await import(`./commands/${file}`);
  let command = commandObj.default;

  client.commands.set(command.data.toJSON().name, command);
  console.log(`Registered Command - ${command.data.toJSON().name}`);
});

client.on("ready", async () => {
  console.log(`Bot has Started`);

  var prefix = process.env.DEFAULT_PREFIX;
  var activityMessage = process.env.STATUS_MESSAGE.replace("{prefix}", prefix);
  var activityType = process.env.ACTIVITY_TYPE;
  var statusType = process.env.STATUS_TYPE;
  client.user.setActivity(activityMessage, { type: activityType });
  if (statusType) client.user.setStatus(statusType);

  let guildData = GuildUtils.loadGuildData();

  guildData.forEach((serverData) => {
    if (!serverData.home) return;

    voiceCtl.execute("botHomeRoom", client, serverData);
  });
});

client.on("guildDelete", (guild) => {
  console.log(`The bot was removed from guild: ${guild.name} (${guild.id})`);
});

client.on("guildCreate", (guild) => {
  GuildUtils.getForGuild(guild);

  return console.log(`The bot was added to: ${guild.name} (${guild.id})`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.guild)
    return message.channel.send("⚠ - Sorry my DM's are closed!");

  let serverData = GuildUtils.getForGuild(message.guild);

  var prefix = process.env.DEFAULT_PREFIX;
  if (serverData.prefix) prefix = serverData.prefix;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  /*if (!client.commands.has(commandName) && !client.aliases.has(commandName)) {
    return;
  } else {
    const cmd =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    try {
      var serverCommands = serverData.commands;

      if (serverCommands[commandName]) {
        var command = serverCommands[commandName];

        if (
          !message.channel.permissionsFor(message.member).has("MANAGE_GUILD") ||
          !message.channel.permissionsFor(message.member).has("ADMINISTRATOR")
        ) {
          if (command.private !== true) {
            if (command.enabled === false)
              return message.channel.send("❌ - This command is disabled.");
            if (command.type === "role") {
              if (!message.member.roles.cache.has(command.id))
                return message.channel.send(
                  "❌ - Oh No! You've not got permission to use that!"
                );
            } else if (command.type === "user") {
              if (message.author.id !== command.id)
                return message.channel.send(
                  "❌ - Oh No! You've not got permission to use that!"
                );
            } else if (command.type === "permission") {
              console.log(
                message.channel
                  .permissionsFor(message.member)
                  .has(command.permission)
              );
              console.log(command.permission);
              if (
                message.channel
                  .permissionsFor(message.member)
                  .has(command.permission)
              )
                return message.channel.send(
                  "❌ - Oh No! You've not got permission to use that!"
                );
            }
          }
        }
      }

      cmd.execute(client, serverData, message, args);
    } catch (error) {
      Utils.logError(new Date(), error);
      message.channel.send(
        `🚫 - Oops! Something went wrong. Please contact Finniedj.exe#9075 or TWIXGAMER#1372 with reference \`${new Date()}\``
      );
    }
  }*/
});

client.on(Discord.Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(
      `🚫 - Oops! Something went wrong \n No command matching ${interaction.commandName} was found.`
    );
    return;
  }

  let guildData = GuildUtils.getForGuild(interaction.guild);
  try {
    await command.execute(interaction, client, guildData);
  } catch (error) {
    console.error(error);
    Utils.logError(new Date(), error);
    interaction.reply({
      content: `🚫 - Oops! Something went wrong. Please contact Finniedj.exe#9075 or TWIXGAMER#1372 with reference \`${new Date()}\``,
      ephemeral: true,
    });
  }
});

global.sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

client.login(process.env.BOT_TOKEN);
