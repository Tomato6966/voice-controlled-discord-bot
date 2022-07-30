const { getVoiceConnection } = require("@discordjs/voice");
const { PermissionsBitField } = require("discord.js");
const { joinVoiceChannelUtil, playSong, createQueue, createSong } = require("../utils/playerFunctions.js");
const { parseAudioData } = require("../utils/speechHandler.js");
const { default: YouTube } = require('youtube-sr');
const { translate } = require("../utils/language.js");
module.exports = {
    name: "pause",
    description: "Pauses the current Track",
    execute: async (client, args, user, channel, voiceChannel, message, prefix) => {
        const oldConnection = getVoiceConnection(channel.guild.id);
        if(!oldConnection) return channel.send({
            content: translate(client, channel.guild.id, "NOT_CONNECTED")
        }).catch(() => null);
        
        const queue = client.queues.get(channel.guild.id); // get the queue
        if(!queue) { 
            return channel.send({
                content: translate(client, channel.guild.id, "NOTHING_PLAYING")
            }).catch(() => null);
        }
        
        // if already paused
        if(queue.paused) return channel.send({
            content: translate(client, channel.guild.id, "NOT_RESUMED")
        }).catch(() => null);
        
        queue.paused = true;
        
        // skip the track
        oldConnection.state.subscription.player.pause();
        
        return channel.send({
            content: translate(client, channel.guild.id, "PAUSED")
        }).catch(() => null);
    }
}