const { getVoiceConnection } = require("@discordjs/voice");
const { PermissionsBitField } = require("discord.js");
const { joinVoiceChannelUtil } = require("../utils/playerFunctions.js");
const { parseAudioData } = require("../utils/speechHandler.js");
const { settings, Emojis } = require("../utils/constants/settingsData.js");
const { translate } = require("../utils/language.js");
const justListened = new Map();

module.exports = {
    name: "control",
    description: "Take audio-control of the Bot",
    execute: async (client, args, user, channel, voiceChannel, message, prefix) => {
        try {
            // User's VOice Channel Connection
            const { channel } = message.member.voice;
            // if not connected, return an error
            if (!channel) return message.reply({ content: translate(client, message.guildId, "JOIN_VC") }).catch(console.warn);
            
            // receive the Bot's connection
            const oldConnection = getVoiceConnection(message.guildId);
            // if the bot is connected already return error
            if (oldConnection) return message.reply({ content: translate(client, message.guildId, "ALREADY_CONNECTED", oldConnection.joinConfig.channelId) }).catch(() => null);
            
            // missing Permission for CONNECT
            if (!channel.permissionsFor(client.user.id)?.has(PermissionsBitField.Flags.Connect)) return message.reply({ content: translate(client, message.guildId, "MISSING_PERMS", "__CONNECT__") }).catch(() => null);
            // missing Permission for SPEAK
            if (!channel.permissionsFor(client.user.id)?.has(PermissionsBitField.Flags.Speak)) return message.reply({ content: translate(client, message.guildId, "MISSING_PERMS", "__SPEAK__") }).catch(() => null);
            
            //join in a voice connection
            const voiceConnection = await joinVoiceChannelUtil(client, channel);
            if (!voiceConnection) return message.reply({ content: translate(client, message.guildId, "COULD_NOT_JOIN", channel.id) }).catch(() => null);
            
            client.listenAbleUsers.add(message.author.id);

            //STARTE ZUHÖRER
            voiceConnection.receiver.speaking.on("start", async (userId) => {
                // if it's an invalid User, or the user is not allowed anymore, or still is on cooldown WAIT
                if (!client.listenAbleUsers.has(userId) || userId !== message.author.id || IsOnCooldown(userId, settings.listeningCooldown)) return
                // use and parse the audio data from the user
                parseAudioData(client, voiceConnection, message.author, message.channel)
            })

            //ERROR LOGGER
            voiceConnection.receiver.speaking.on('disconnect', async (e) => {
                if (e) console.error(e);
                client.listenAbleUsers.delete(message.author.id);
            });

            message.reply({
                content: translate(client, message.guildId, "CONTROLLING", client.commands.filter(c => !settings.prefixCommands.includes(c.name)).map(x => `\`${x.name}\``).join(","))
            }).catch(() => null);
        } catch (e) {
            console.error(e);
            message.reply({ content: `${Emojis.cross.str} Could not connect. **Reason**: \`\`\`${e.message || e}`.substring(0, 1950) + `\`\`\`` }).catch(() => null);
        }
    }
}

function IsOnCooldown(userId, time = 5_000) {
    const justListenedTime = justListened.get(userId);

    if (justListenedTime && Date.now() - justListenedTime < time) return true;

    justListened.set(userId, Date.now());

    return false;
}