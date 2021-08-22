import dotenv from 'dotenv';
import { ShardingManager } from 'discord.js';
import fs from 'fs';

dotenv.config();

/*if (!fs.existsSync('./persist/guilds.json')) {
    fs.copyFile('./persist/guilds.json.example', './persist/guilds.json', (err) => { 
        if (err) { 
          console.log("Error Found:", err); 
        }
    });
}*/

const manager = new ShardingManager('./index.mjs', { token: process.env.BOT_TOKEN });
manager.on('shardCreate', shard => console.log(`Starting Shard: ${shard.id}`));
manager.spawn();
