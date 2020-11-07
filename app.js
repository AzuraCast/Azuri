const { ShardingManager } = require('discord.js');
require('dotenv').config();
const env = process.env;

const manager = new ShardingManager('./index.js', { token: env.BOT_TOKEN });
manager.on('shardCreate', shard => console.log(`Starting Shard: ${shard.id}`));
manager.spawn();