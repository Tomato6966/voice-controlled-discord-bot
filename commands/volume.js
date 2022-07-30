const { playSong, createQueue, createSong, queuePos } = require("../utils/playerFunctions.js");
const { default: YouTube } = require('youtube-sr');
const { getVoiceConnection } = require("@discordjs/voice");
const { translate } = require("../utils/language.js");
module.exports = {
    name: "volume",
    description: "Changes the Volume",
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
        if(!args[0] || isNaN(Number(args[0])) || Number(args[0]) < 0 || Number(args[0]) > 150) {
            return channel.send({
                content: translate(client, channel.guild.id, "INVALID_VOL")
            }).catch(() => null);
        } 
        queue.volume = Number(args[0]);

        // change the volume
        oldConnection.state.subscription.player.state.resource.volume.setVolume(queue.volume / 100);

        return channel.send({
            content: translate(client, channel.guild.id, "VOLUME", queue.volume)
        }).catch(() => null);
    }
}