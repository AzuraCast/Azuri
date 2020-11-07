const { ShardingManager } = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const env = process.env;

if (!fs.existsSync('./persist/guilds.json')) {
    fs.copyFile('./persist/guilds.json.example', './persist/guilds.json', (err) => { 
        if (err) { 
          console.log("Error Found:", err); 
        }
    });
}

const manager = new ShardingManager('./index.js', { token: env.BOT_TOKEN });
manager.on('shardCreate', shard => console.log(`Starting Shard: ${shard.id}`));
manager.spawn();