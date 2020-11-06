const L = require('../locale/locales')
const guildsData = require('../data/guilds.json');
const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
const env = process.env;

module.exports = {
    name: 'settings',
    aliases: [
        'setting',
        'config',
        's'
    ],
    description: L._U('en', 'desc_settings'),
    execute: (client, guildData, message, ...args) => {
        if(!message.guild) return message.reply(L._U(guildData.locale, 'server_only'));
        if(!args) return message.reply(L._U(guildData.locale, 'missing_args'));
        if(!message.channel.permissionsFor(message.member).has('MANAGE_GUILD') || !message.channel.permissionsFor(message.member).has('ADMINISTRATOR')) return message.reply("❌ - Oh No! You've not got permission to use that!");
        if(args[0][0] === 'url') {
            if(args[0][1]) {
                guildsData.forEach((data, id) => {
                    if(data.id === guildData.id) {
                        guildsData[id].url = args[0][1];

                        fs.writeFile('./data/guilds.json', JSON.stringify(guildsData), (err, data) => {
                            if (err) { 
                                console.log(err);
                                logError(new Date(), err)
                            };
                            console.log(data)
                            console.log("Written new settings to file");
                        });

                        console.log(`Changed Radio URL for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`)

                        return message.reply(`📫 ${L._U(guildData.locale, 'set')}!`)
                    }
                });
            } else {
                return message.reply(`${L._U(guildData.locale, 'current_radio_url')}: ${guildData.url}`)
            }
        } else if(args[0][0] === 'home') {
            if(args[0][1]) {
                guildsData.forEach((data, id) => {
                    if(data.id === guildData.id) {
                        let channel = client.channels.cache.get(args[0][1]);

                        if(!channel) return message.reply(L._U(guildData.locale, 'no_find_voice'));
                        if(channel.type !== 'voice') return message.reply(L._U(guildData.locale, 'channel_not_voice'));

                        guildsData[id].home = channel.id;

                        fs.writeFile('./data/guilds.json', JSON.stringify(guildsData), (err, data) => {
                            if (err) { 
                                console.log(err);
                                logError(new Date(), err)
                            };
                            console.log(data)
                            console.log("Written new settings to file");
                        });

                        console.log(`Changed Home room for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`)

                        return message.reply(`📫 ${L._U(guildData.locale, 'set')}!`)
                    }
                });
            } else {
                return message.reply(`${L._U(guildData.locale, 'current_homeroom')}: ${guildData.home}`)
            }
        } else if(args[0][0] === 'prefix') {
            if(args[0][1]) {
                guildsData.forEach((data, id) => {
                    if(data.id === guildData.id) {
                        guildsData[id].prefix = args[0][1];

                        fs.writeFile('./data/guilds.json', JSON.stringify(guildsData), (err, data) => {
                            if (err) { 
                                console.log(err);
                                logError(new Date(), err)
                            };
                        });

                        console.log(`Changed Prefix for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`)

                        return message.reply(`📫 ${L._U(guildData.locale, 'set')}!`)
                    }
                });
            } else {
                return message.reply(`${L._U(guildData.locale, 'current_prefix')}: ${guildData.preifx}`)
            }
        } else if(args[0][0] === 'api') {
            if(args[0][1]) {
                guildsData.forEach((data, id) => {
                    if(data.id === guildData.id) {
                        guildsData[id].api = args[0][1];

                        fs.writeFile('./data/guilds.json', JSON.stringify(guildsData), (err, data) => {
                            if (err) { 
                                console.log(err);
                                logError(new Date(), err)
                            };
                            console.log(data)
                            console.log("Written new settings to file");
                        });

                        console.log(`Changed API URL for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`)

                        return message.reply(`📫 ${L._U(guildData.locale, 'set')}!`)
                    }
                });
            } else {
                return message.reply(`${L._U('guildData.locale, currnet_api')}: ${guildData.api}`)
            }
        } else if(args[0][0] === 'locale') {
            if(args[0][1]) {
                guildsData.forEach((data, id) => {
                    if(data.id === guildData.id) {
                        guildsData[id].locale = args[0][1].toLowerCase();

                        fs.writeFile('./data/guilds.json', JSON.stringify(guildsData), (err, data) => {
                            if (err) { 
                                console.log(err);
                                logError(new Date(), err)
                            };
                            console.log(data)
                            console.log("Written new settings to file");
                        });

                        console.log(`Changed Locale for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`)

                        return message.reply(`📫 ${L._U(guildData.locale, 'set')}!`)
                    }
                });
            } else {
                return message.reply(`${L._U(guildData.locale, 'current_locale')}: ${guildData.locale}`)
            }
        } else if(args[0][0] === 'timezone') {
            if(args[0][1]) {
                guildsData.forEach((data, id) => {
                    if(data.id === guildData.id) {
                        guildsData[id].timezone = args[0][1];

                        fs.writeFile('./data/guilds.json', JSON.stringify(guildsData), (err, data) => {
                            if (err) { 
                                console.log(err);
                                logError(new Date(), err)
                            };
                            console.log(data)
                            console.log("Written new settings to file");
                        });

                        console.log(`Changed Timezone for ${message.guild.name} (${message.guild.id}) to ${args[0][1]}`)

                        return message.reply(`📫 ${L._U(guildData.locale, 'set')}!`)
                    }
                });
            } else {
                return message.reply(`${L._U(guildData.locale, 'current_timezone')}: ${guildData.timezone} | ${L._U(guildData.locale, 'full_list_timezone')} <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>`)
            }
        } else if(args[0][0] === 'permission') {
            if(args[0][1]) {
                if(!(client.commands.get(args[0][2]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0][2])))) return message.reply(L._U(guildData.locale, 'no_find_command')); 
                if(args[0][1] == 'role') {
                    if(message.guild.roles.cache.filter(role => role.id === args[0][3])) {
                        guildsData.forEach((data, id) => {
                            if(data.id === guildData.id) {
                                if(!guildsData[id].commands[args[0][2]]) {
                                    guildsData[id].commands[args[0][2]] = {}
                                }
                                
                                guildsData[id].commands[args[0][2]].type = 'role';
                                guildsData[id].commands[args[0][2]].id = args[0][3];
                                
                                console.log(args[0][2])
                                console.log(guildsData[id])
                                console.log(`Changed Permission for ${args[0][2]} to role w/ id on ${args[0][3]} ${message.guild.name} (${message.guild.id})`)
                            }
                        });
                    } else {
                        return message.reply(L._U(guildData.locale, 'no_find_role'))
                    }
                } else if (args[0][1] == 'user') {
                    if(message.guild.members.cache.get(args[0][3])) {
                        guildsData.forEach((data, id) => {
                            if(data.id === guildData.id) {
                                if(!guildsData[id].commands[args[0][2]]) {
                                    guildsData[id].commands[args[0][2]] = {}
                                }

                                guildsData[id].commands[args[0][2]].type = 'user';
                                guildsData[id].commands[args[0][2]].id = args[0][3];

                                console.log(guildsData)
        
                                console.log(`Changed Permission for ${args[0][2]} to user w/ id on ${args[0][3]} ${message.guild.name} (${message.guild.id})`)

                            }
                        });
                    } else {
                        return message.reply(L._U(guildData.locale, 'no_find_user'))
                    }
                } else if (args[0][1] == 'permission') {
                    if(message.guild.users.cache.filter(user => user.id === args[0][3])) {
                        guildsData.forEach((data, id) => {
                            if(data.id === guildData.id) {
                                if(!guildsData[id].commands[args[0][2]]) {
                                    guildsData[id].commands[args[0][2]] = {}
                                }

                                guildsData[id].commands[args[0][2]].type = 'permission';
                                guildsData[id].commands[args[0][2]].permission = args[0][3];
        
                                console.log(`Changed Permission for ${args[0][2]} to permission on ${args[0][3]} ${message.guild.name} (${message.guild.id})`)
        
                            }
                        });
                    } else {
                        return message.reply(L._U(guildData.locale, 'no_find_user'))
                    }
                }
            } else {
                
            }

            console.log("ee")
            console.log("data2write")
            console.log(JSON.stringify(guildsData))
            
            fs.writeFile('./data/guilds.json', JSON.stringify(guildsData), (err, data) => {
                if (err) { 
                    console.log(err);
                    logError(new Date(), err)
                };
                console.log(data)
                console.log("Written new settings to file");
            });

            fs.readFile('./data/guilds.json', "utf8", (err, data) => {
                if(err) throw err;

                console.log(data);
                console.log("yes");
            })

            return message.reply(`📫 ${L._U(guildData.locale, 'set')}!`)
        } else {

            var prefix = guildData.preifx ? guildData.preifx : env.DEFAULT_PREFIX

            const settingEmbed = new Discord.MessageEmbed()
                .setColor('#1f8df5')
                .setTitle(`Azuri - ${L._U(guildData.locale, 'setting')}`)
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
                        value: "Setup server locale",
                    },
                    { 
                        name: `${prefix}settings preifx \`<preifx>\``,
                        value: "Setup server prefix",
                    }
                )
                .setTimestamp();

            message.channel.send(settingEmbed);
        }
    }
}
