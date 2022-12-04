import * as L from "../locale/locales.mjs";
import dv from "@discordjs/voice";
import ffmpeg from "ffmpeg";
import fs from "fs";
import Discord, { IntegrationExpireBehavior } from "discord.js";
let radioURL, voiceChannel, dispatcher, player;

export default {
  data: new Discord.SlashCommandBuilder()
    .setDMPermission(false)
    .setName("join")
    .setDescription(L._U("en", "desc_join")),
  async execute(interaction, client, guildData) {
    radioURL = guildData.url;
    if (interaction === "botHomeRoom") {
      voiceChannel = guildData.home;

      let channel = client.channels.cache.get(guildData.home);
      try {
        if (!client.voice.channel)
          if (channel)
            global.connection = await dv.joinVoiceChannel({
              channelId: channel.id,
              guildId: channel.guild.id,
              selfMute: false,
              selfDeaf: true,
              adapterCreator: channel.guild.voiceAdapterCreator,
            });
      } catch (e) {
        console.log(e);
        try {
          return message.channel.send(L._U(guildData.locale, "no_join"));
        } catch (e) {
          if (guildData.home) {
            let s = client.channels.cache.get(guildData.home);
            if (s)
              s.guild.channels.cache
                .filter((c) => c.type === "GUILD_TEXT")
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
        await sleep(5000);
        player.play(resource);

        player.on(dv.AudioPlayerStatus.Idle, async () => {
          const newResource = dv.createAudioResource(radioURL);
          await sleep(5000);
          player.play(newResource);
        });
      } catch (e) {
        try {
          console.log(e);
          message.channel.send(L._U(guildData.locale, "stream_error"));
        } catch (e) {
          if (guildData.home) {
            let s = client.channels.cache.get(guildData.home);
            if (s)
              s.guild.channels.cache
                .filter((c) => c.type === "GUILD_TEXT")
                .find((x) => x.position == 0)
                .send(L._U(guildData.locale, "stream_error"));
          }
        }
      }
      return;
    }

    if (!interaction.guild)
      return interaction.reply({
        content: L._U(guildData.locale, "server_only"),
        ephemeral: true,
      });
    if (!guildData.url)
      return interaction.reply({
        content: L._U(guildData.locale, "no_radio_url"),
        ephemeral: true,
      });

    if (!interaction.member.voice.channel)
      return interaction.reply({
        content: L._U(guildData.locale, "no_find_voice"),
        ephemeral: true,
      });

    radioURL = guildData.url;
    voiceChannel = interaction.member.voice.channel;

    try {
      interaction.deferReply({ ephemeral: false });
      global.connection = await dv.joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.guild.id,
        selfMute: false,
        selfDeaf: true,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
    } catch (e) {
      console.log(e);
      return interaction.editReply({
        content: L._U(guildData.locale, "no_join"),
        ephemeral: true,
      });
    }

    try {
      const connection = dv.getVoiceConnection(interaction.guild.id);
      player = dv.createAudioPlayer();
      connection.subscribe(player);
      const resource = dv.createAudioResource(radioURL);
      await sleep(5000);
      player.play(resource);
      interaction.editReply({
        content: "🎤 Joined the channel!",
        ephemeral: false,
      });
      player.on(dv.AudioPlayerStatus.Idle, async () => {
        const newResource = dv.createAudioResource(radioURL);
        await sleep(5000);
        player.play(newResource);
      });
    } catch (e) {
      console.log(e);
      interaction.editReply({
        content: L._U(guildData.locale, "stream_error"),
        ephemeral: true,
      });
    }
  },
};
