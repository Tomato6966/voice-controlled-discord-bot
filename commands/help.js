const { getVoiceConnection } = require("@discordjs/voice");
const { PermissionsBitField } = require("discord.js");
const { translate } = require("../utils/language.js");
const { joinVoiceChannelUtil } = require("../utils/playerFunctions.js");
const { parseAudioData } = require("../utils/speechHandler.js");
module.exports = {
    name: "help",
    description: "Information about me",
    execute: async (client, args, user, channel, voiceChannel, message, prefix) => {
        channel.send({
            content: translate(client, channel.guild.id, "HELP", prefix || process.env.DEFAULTPREFIX)
        }).catch(() => null);
    }
}