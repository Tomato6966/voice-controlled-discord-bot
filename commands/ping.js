const { getVoiceConnection } = require("@discordjs/voice");
const { PermissionsBitField } = require("discord.js");
const { translate } = require("../utils/language.js");
const { joinVoiceChannelUtil } = require("../utils/playerFunctions.js");
const { parseAudioData } = require("../utils/speechHandler.js");
module.exports = {
    name: "ping",
    description: "Responses with the Api-Ws-Ping",
    execute: async (client, args, user, channel, voiceChannel, message, prefix) => {
        channel.send({
            content: translate(client, channel.guild.id, "PING", client.ws.ping)
        }).catch(() => null);
    }
}