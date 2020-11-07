require('dotenv').config();
const env = process.env;
const Discord = require('discord.js');
const fs = require('fs');
const Utils = require('./utils/utils');
const voiceCtl = require('./commands/join');
const guildData = require('./persist/guilds.json');

const client = new Discord.Client({
    autoReconnect: true
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Registered Command - ${command.name}`);

    if(command.aliases) {
        command.aliases.forEach(alias => {
            client.aliases.set(alias, command)
        });
    };
});

let serverData = {};
guildData.forEach(guild => {
    serverData = guild;
});


client.on('ready', async () => {
    console.log(`Bot has Started`);

    client.user.setActivity("The tunes", { type: "LISTENING" });

    guildData.forEach(servData => {
        if(!serverData.home) return;

        voiceCtl.execute(client, servData, "botHomeRoom");
    })
});

client.on('guildDelete', (guild) => {
    console.log(`The bot was removed from guild: ${guild.name} (${guild.id})`)
})

client.on('guildCreate', (guild) => {
    if(guildData.find(serv => serv.id === guild.id)) {
        return console.log(`The bot was added a returning guild: ${guild.name} (${guild.id})`);
    } else {
        data = {
            "id": `${guild.id}`,
            "timezone": "ETC/UTC",
            "locale": "en",
            "home": null,
            "url": null,
            "api": null,
            "commands": {}
        }
        guildData.push(data)
    
        fs.writeFileSync('./persist/guilds.json', JSON.stringify(guildData), (err) => {
            if (err) console.log(err);
            console.log("done")
        })
    
        return console.log(`The bot was added to: ${guild.name} (${guild.id})`);
    }
})

client.on('message', ( message ) => {
    var prefix = env.DEFAULT_PREFIX;
    if(serverData.prefix) prefix = serverData.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName) && !client.aliases.has(commandName)) {
        return;
    } else {
        const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        try {
            if(!serverData) return message.reply("🚫 - Oh no! There's been an issue while setting up! Please run `/settings init`");
            
            var serverCommands = serverData.commands;

            if(serverCommands[commandName]) {
                var command = serverCommands[commandName];

                if(!message.channel.permissionsFor(message.member).has('MANAGE_GUILD') || !message.channel.permissionsFor(message.member).has('ADMINISTRATOR')) {
                    if(command.private !== true) {
                        if(command.enabled === false) return message.reply("❌ - This command is disabled.");
                        if(command.type === 'role') {
                            if(!message.member.roles.cache.has(command.id)) return message.reply("❌ - Oh No! You've not got permission to use that!");
                        } else if (command.type === 'user') {
                            if(message.author.id !== command.id) return message.reply("❌ - Oh No! You've not got permission to use that!")
                        } else if (command.type === 'permission') {
                            console.log(message.channel.permissionsFor(message.member).has(command.permission))
                            console.log(command.permission)
                            if(message.channel.permissionsFor(message.member).has(command.permission)) return message.reply("❌ - Oh No! You've not got permission to use that!")
                        }
                    } 
                }
            }

            cmd.execute(client, serverData, message, args);
        } catch (error) {
            console.log("Hit")
            Utils.logError(new Date(), error);
            message.reply(`🚫 - Oops! Something went wrong. Please contact Ninja#4321 with reference \`${new Date()}\``);
        }
    }
});

client.login(env.BOT_TOKEN);