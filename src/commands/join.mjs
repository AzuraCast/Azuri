import * as L from "../locale/locales.mjs";
import dv from "@discordjs/voice";
import ffmpeg from "ffmpeg";
import fs from "fs";
let radioURL, voiceChannel, dispatcher, player;

export default {
  name: "join",
  aliases: ["j", "play", "start"],
  description: L._U("en", "desc_join"),
  execute: async (client, guildData, message, ...args) => {
    if (message === "botHomeRoom") {
      radioURL = guildData.url;
      voiceChannel = guildData.home;

      let channel = client.channels.cache.get(guildData.home);
      try {
        if (!client.voice.channel)
          if (channel) global.connection = await dv.joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            selfMute: false,
            selfDeaf: true,
            adapterCreator: channel.guild.voiceAdapterCreator,
          });
      } catch (e) {
        try {
          return message.channel.send(L._U(guildData.locale, "no_join"));
        } catch (e) {
          if (guildData.home) {
          let s = client.channels.cache.get(guildData.home)
            if (s) s.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT")
            .find((x) => x.position == 0)
            .send(L._U(guildData.locale, "no_join"));
          }
        }
      }

      try {
        if (!channel) return;
        const connection = dv.getVoiceConnection(channel.guild.id);
        player = dv.createAudioPlayer();
        dispatcher = connection.subscribe(player);
        const resource = dv.createAudioResource(radioURL);
        await sleep(5000)
        player.play(resource);
        player.on(dv.AudioPlayerStatus.Idle, async () => {
          const newResource = dv.createAudioResource(radioURL);
          await sleep(5000)
          player.play(newResource);
        });
      } catch (e) {
        try {
          console.log(e);
          message.channel.send(L._U(guildData.locale, "stream_error"));
        } catch (e) {
          if (guildData.home) {
          let s = client.channels.cache.get(guildData.home)
            if (s) s.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT")
            .find((x) => x.position == 0)
            .send(L._U(guildData.locale, "stream_error"));
          }
        }
      }
      return;
    }

    if (!message.guild)
      return message.channel.send(L._U(guildData.locale, "server_only"));
    if (!guildData.url)
      return message.channel.send(L._U(guildData.locale, "no_radio_url"));

    if (args[0][0] === "home") {
      if (!guildData.home)
        return message.channel.send(L._U(guildData.locale, "no_home_room"));

      let channel = client.channels.cache.get(guildData.home);

      if (!channel)
        return message.channel.send(L._U(guildData.locale, "no_find_voice"));

      radioURL = guildData.url;
      voiceChannel = channel;
    } else if (args[0][0] === "test") {
      if (!message.member.voice.channel)
        return message.channel.send(L._U(guildData.locale, "no_find_voice"));

      message.channel.send("Playing testing audio!");

      radioURL = "./audio/template.mp3";
      voiceChannel = message.member.voice.channel;
    } else {
      if (!message.member.voice.channel)
        return message.channel.send(L._U(guildData.locale, "no_find_voice"));

      radioURL = guildData.url;
      voiceChannel = message.member.voice.channel;
    }

    try {
      global.connection = await dv.joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        selfMute: false,
        selfDeaf: true,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
    } catch (e) {
      console.log(e);
      return message.channel.send(L._U(guildData.locale, "no_join"));
    }

    try {
      const connection = dv.getVoiceConnection(message.guild.id);
      player = dv.createAudioPlayer();
      connection.subscribe(player);
      const resource = dv.createAudioResource(radioURL);
      await sleep(5000)
      player.play(resource);
      player.on(dv.AudioPlayerStatus.Idle, async () => {
        const newResource = dv.createAudioResource(radioURL);
        await sleep(5000)
        player.play(newResource);
      });
    } catch (e) {
      console.log(e);
      message.channel.send(L._U(guildData.locale, "stream_error"));
    }
  },
};
