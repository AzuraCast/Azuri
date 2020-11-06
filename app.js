const { ShardingManager } = require('discord.js');
const Utils = require('./utils/utils');
require('dotenv').config();
const env = process.env;

Utils.checkForUpdate();

const manager = new ShardingManager('./index.js', { token: env.BOT_TOKEN });
manager.on('shardCreate', shard => console.log(`Starting Shard: ${shard.id}`));
manager.spawn();