const { playSong, createQueue, createSong, queuePos } = require("../utils/playerFunctions.js");
const { default: YouTube } = require('youtube-sr');
const { getVoiceConnection } = require("@discordjs/voice");
const { translate } = require("../utils/language.js");
module.exports = {
    name: "play",
    description: "Play a song",
    aliases: ["place"],
    execute: async (client, args, user, channel, voiceChannel, message, prefix) => {
        const oldConnection = getVoiceConnection(channel.guild.id);
        if(!oldConnection) return channel.send({
            content: translate(client, channel.guild.id, "NOT_CONNECTED")
        }).catch(() => null);
        
        const track = args.join(" ");
        if(!args[0]) return channel.send(`👎 Please add the wished Music via saying: \`voice play <Name/Link>\``).catch(() => null);
        // Regexpressions for testing the search string
        const youtubRegex = /^(https?:\/\/)?(www\.)?(m\.|music\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistRegex = /^.*(list=)([^#\&\?]*).*/gi;
        const songRegex = /^.*(watch\?v=)([^#\&\?]*).*/gi;
        // variables for song, and playlist
        let song = null;
        let playlist = null;
        // Use the regex expressions
        const isYT = youtubRegex.exec(track);
        const isSong = songRegex.exec(track);
        const isList = playlistRegex.exec(track)
             
        try {
            // try to play the requested song
            const m = await channel.send(`🔍 *Searching **${track}** ...*`).catch(() => null);
            // get the queue
            let queue = client.queues.get(channel.guild.id); 
            // get song from the link
            if(isYT && isSong && !isList) {
                song = await YouTube.getVideo(track); 
            }
            // get playlist from the link
            else if(isYT && !isSong && isList) {
                playlist = await YouTube.getPlaylist(track).then(playlist => playlist.fetch());
            }
            // get playlist & song from the link
            else if(isYT && isSong && isList) {
                song = await YouTube.getVideo(`https://www.youtube.com/watch?v=${isSong[2]}`); 
                playlist = await YouTube.getPlaylist(`https://www.youtube.com/playlist?list=${isList[2]}`).then(playlist => playlist.fetch());
            }
            // otherwise search for it
            else {
                song = await YouTube.searchOne(track); 
            }

            if(!song && !playlist) return m.edit(`❌ **Failed looking up for ${track}!**`);
            /* FOR NO PLAYLIST REQUESTS */
            if(!playlist) {
                // if there is no queue create one and start playing
                if(!queue || queue.tracks.length == 0) { 
                    // Add the playlist songs to the queue
                    const newQueue = createQueue(song, user, channel.id, voiceChannel.id)
                    client.queues.set(channel.guild.id, newQueue)
                    // play the song in the voice channel
                    await playSong(client, voiceChannel, song);
                    // edit the loading message     
                    return m.edit(`▶️ **Now Playing: __${song.title}__** - \`${song.durationFormatted}\``).catch(() => null);
                }
                // Add the song to the queue
                queue.tracks.push(createSong(song, user))
                // edit the loading message     
                return m.edit(`👍 **Queued at \`${queuePos(queue.tracks.length - 1)}\`: __${song.title}__** - \`${song.durationFormatted}\``).catch(() => null);
            } 
            /* FOR PLAYLIST REQUEST */
            else {
                // get the song, or the first playlist song
                song = song ? song : playlist.videos[0];
                // remove the song which got added
                const index = playlist.videos.findIndex(s => s.id == song.id) || 0;
                playlist.videos.splice(index, 1)    
                // if there is no queue create one and start playing
                if(!queue || queue.tracks.length == 0) { 
                   // Add the playlist songs to the queue
                    const newQueue = createQueue(song, user, channel.id, voiceChannel.id)
                    playlist.videos.forEach(song => newQueue.tracks.push(createSong(song, user)))
                    client.queues.set(channel.guild.id, newQueue)
                    // play the song in the voice channel
                    await playSong(client, voiceChannel, song);
                    // edit the loading message     
                    return m.edit(`▶️ **Now Playing: __${song.title}__** - \`${song.durationFormatted}\`\n> **Added \`${playlist.videos.length - 1} Songs\` from the Playlist:**\n> __**${playlist.title}**__`).catch(() => null);
                }
                // Add the playlist songs to the queue
                playlist.videos.forEach(song => queue.tracks.push(createSong(song, user)))
                // edit the loading message                    
                return m.edit(`👍 **Queued at \`${queuePos(queue.tracks.length - (playlist.videos.length - 1))}\`: __${song.title}__** - \`${song.durationFormatted}\`\n> **Added \`${playlist.videos.length - 1} Songs\` from the Playlist:**\n> __**${playlist.title}**__`).catch(() => null);
            }

        } catch (e){ console.error(e);
            return channel.send(`❌ Could not play the Song because: \`\`\`${e.message || e}`.substr(0, 1950) + `\`\`\``).catch(() => null);
        }
    }
}