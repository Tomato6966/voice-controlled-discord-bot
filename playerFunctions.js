// Import Packages
const dcYtdl = require("discord-ytdl-core"); 
const { Client, VoiceChannel, ChannelType, User } = require("discord.js")
const { entersState, joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus, createAudioResource, createAudioPlayer, NoSubscriberBehavior, VoiceConnection, AudioPlayer, AudioResource } = require("@discordjs/voice");
// require settingsData
const { Color, settings } = require("./constants/settingsData");
const { translate } = require("./language");
const { msUnix, delay } = require("./botUtils");
const { EmbedBuilder } = require("discord.js");

/**
 * An array of valid voice channel types the bot can connect to
 */
const validVCTypes = [ChannelType.GuildVoice, ChannelType.GuildStageVoice];

/**
 * Joins a Voice-Channel
 * @param {Client} client 
 * @param {VoiceChannel} channel 
 * @returns {Promise<VoiceConnection>} Voiceconnection
 */
const joinVoiceChannelUtil = async (client, channel) => {
    return new Promise(async (res, rej) => {
        if(!validVCTypes.includes(channel.type)) return rej("Channel is not a Voice / Stage Channel");
        // create a new connection
        const newConnection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false,
        });
        // set the voicestate as rady
        await entersState(newConnection, VoiceConnectionStatus.Ready, 20e3);
        // voiceconnection handlings
        newConnection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                await Promise.race([
                    entersState(newConnection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(newConnection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
                // if no error, then it was a swich
            } catch (error) {
                newConnection.destroy();
            }
        });
        // delete the queue on channel leave
        newConnection.on(VoiceConnectionStatus.Destroyed, () => client.queues.delete(channel.guild.id))

        // making the client a speaker, if in a stage channel
        if(channel.type === ChannelType.GuildStageVoice) await channel.guild.members?.me?.voice?.setSuppressed(true)
        
        return res(newConnection);
    })
};

/**
 * Format < 100 Numbers
 * @param {number} t 
 * @returns 
 */
const m2 = (t) => {
    return parseInt(t) < 10 ? `0${t}` : `${t}`
}

/**
 * Format < 1000 Numbers
 * @param {number} t 
 * @returns 
 */
const m3 = (t) => {
    return parseInt(t) < 100 ? `0${m2(t)}` : `${t}`
}

/**
 * Formats a duration from ms to human-readable
 * @param {number} ms 
 * @returns Formatted Duration in min:sec
 */
const formatDuration = (ms) => {
    const sec = parseInt(ms / 1000 % 60);
    const min = parseInt(ms / (1000*60) % 60);
    const hrs = parseInt(ms / (1000*60*60) % 24);
    if(sec >= 60) sec = 0;
    if(min >= 60) min = 0;
    if(hrs > 1) return `${m2(hrs)}:${m2(min)}:${m2(sec)}`
    return `${m2(min)}:${m2(sec)}`
}

/**
 * Format a link
 * @param {string} ID 
 * @param {string}  prefix "www"|"music"
 * @returns YoutubeWatch link based on id
 */
const getYTLink = (ID, prefix="music") => {
    return `https://${prefix}.youtube.com/watch?v=${ID}`;
}

/**
 * Leaves the voice channel of the guild
 * @param {VoiceChannel} channel 
 * @returns 
 */
const leaveVoiceChannel = async (channel) => {
    return new Promise(async (res, rej) => {
        const oldConnection = getVoiceConnection(channel.guild.id);
        if (oldConnection) {
            if (oldConnection.joinConfig.channelId != channel.id) return rej("We aren't in the same channel!")
            try {
                oldConnection.destroy();
                await delay(250);
                return res(true)
            } catch (e) {
                return rej(e)
            }
        } else {
            return rej("I'm not connected somwhere.")
        }
    })

}

/**
 * Creates a Audio Resource Stream, with FFMPEG Filters (if the queue has them)
 * @param {object} queue 
 * @param {string} songInfoId 
 * @param {?number} seekTime 
 * @returns {AudioResource}
 */
const getResource = (queue, songInfoId, seekTime = 0) => {
    let Qargs = "";
    let effects = queue?.effects || { 
        bassboost: 4,
        speed: 1,
    }
    if(effects.normalizer) Qargs += `,dynaudnorm=f=200`;
    if(effects.bassboost) Qargs += `,bass=g=${effects.bassboost}`
    if(effects.speed) Qargs += `,atempo=${effects.speed}`
    if(effects["3d"]) Qargs += `,apulsator=hz=0.03`
    if(effects.subboost) Qargs += `,asubboost`
    if(effects.mcompand) Qargs += `,mcompand`
    if(effects.haas) Qargs += `,haas`
    if(effects.gate) Qargs += `,agate`
    if(effects.karaoke) Qargs += `,stereotools=mlev=0.03`
    if(effects.flanger) Qargs += `,flanger`
    if(effects.pulsator) Qargs += `,apulsator=hz=1`
    if(effects.surrounding) Qargs += `,surround`
    if(effects.vaporwave) Qargs += `,aresample=48000,asetrate=48000*0.8`
    if(effects.nightcore) Qargs += `,aresample=48000,asetrate=48000*1.5`
    if(effects.phaser) Qargs += `,aphaser=in_gain=0.4`
    if(effects.tremolo) Qargs += `,tremolo`
    if(effects.vibrato) Qargs += `,vibrato=f=6.5`
    if(effects.reverse) Qargs += `,areverse`
    if(effects.treble) Qargs += `,treble=g=5`
    if(Qargs.startsWith(",")) Qargs = Qargs.substring(1)
    const requestOpts = {
        filter: "audioonly",
        fmt: "mp3",
        highWaterMark: 1 << 62, 
        liveBuffer: 1 << 62,
        dlChunkSize: 0,
        seek: Math.floor(seekTime / 1000),
        bitrate: queue?.bitrate || 128,
        quality: "lowestaudio",
        encoderArgs: Qargs ? ["-af", Qargs ] : ['-af', 'bass=g=6,dynaudnorm=f=200'] // queue.filters
    };
    if(process.env.YOUTUBE_LOGIN_COOKIE && process.env.YOUTUBE_LOGIN_COOKIE.length > 10) {
        requestOpts.requestOptions = {
            headers: {
              cookie: process.env.YOUTUBE_LOGIN_COOKIE,
            }
        }
    }
    const resource = createAudioResource(dcYtdl(getYTLink(songInfoId), requestOpts), {
        inlineVolume: true
    });
    const volume = queue && queue.volume && queue.volume <= 150 && queue.volume >= 1 ? (queue.volume / 100) : 0.15;  // queue.volume / 100;
    resource.volume.setVolume(volume);
    resource.playbackDuration = seekTime;
    return resource;
}

/**
 * Plays a song in a voice channel if possible, else it's adding it
 * @param {Client} client 
 * @param {VoiceChannel} channel 
 * @param {object} songInfo 
 * @returns 
 */
const playSong = async (client, channel, songInfo) => {
    return new Promise(async (res, rej) => {
        const oldConnection = getVoiceConnection(channel.guild.id);
        if (oldConnection) {
            if (oldConnection.joinConfig.channelId != channel.id) return rej("We aren't in the same channel!")
            try {
                const curQueue = client.queues.get(channel.guild.id);
                
                const player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Stop,
                    },
                });
                oldConnection.subscribe(player);
                
                const resource = getResource(curQueue, songInfo.id);
                // play the resource
                player.play(resource);
                
                // When the player plays a new song
                player.on("playing", (player) => {
                    const queue = client.queues.get(channel.guild.id);
                    // if filters changed, don't send something
                    if(queue && queue.filtersChanged) {
                        queue.filtersChanged = false;
                    } else {
                        sendQueueUpdate(client, channel.guild.id);
                    }
                    
                });
                // When the player goes on idle
                player.on("idle", () => {
                    const queue = client.queues.get(channel.guild.id);
                    handleQueue(client, player, queue)
                })
                // when an error happens
                player.on('error', error => {
                    console.error(error);
                    const queue = client.queues.get(channel.guild.id);
                    handleQueue(client, player, queue)
                });
                
                return res(songInfo);
            } catch (e) {
                return rej(e)
            }
        } else {
            return rej("I'm not connected somwhere.")
        }
    })

}

/**
 * handles the queue (skipping, stopping, looping)
 * @param {Client} client 
 * @param {AudioPlayer} player 
 * @param {object} queue 
 * @returns {void} 
 */
async function handleQueue(client, player, queue) {
    if(queue && !queue.filtersChanged) {
        try {
            player.stop()
            if(queue && queue.tracks && queue.tracks.length > 1) {
                queue.previous = queue.tracks[0];
                if(queue.trackloop && !queue.skipped) {
                    if(queue.paused) queue.paused = false;
                    if(queue.tracks[0]?.resource) player.play(createAudioResource(queue.tracks[0].resource))
                    else player.play(getResource(queue, queue.tracks[0].id))
                } else if(queue.queueloop && !queue.skipped) {
                    const skipped = queue.tracks.shift();
                    queue.tracks.push(skipped);
                    if(queue.paused) queue.paused = false;
                    if(queue.tracks[0]?.resource) player.play(createAudioResource(queue.tracks[0].resource))
                    else player.play(getResource(queue, queue.tracks[0].id));
                } else {
                    if(queue.skipped) queue.skipped = false;
                    if(queue.paused) queue.paused = false;
                    queue.tracks.shift();
                    if(queue.tracks[0]?.resource) player.play(createAudioResource(queue.tracks[0].resource));
                    else player.play(getResource(queue, queue.tracks[0].id));
                }
            } else if(queue && queue.tracks && queue.tracks.length <= 1) { // removes the nowplaying, if no upcoming and ends it
                queue.previous = queue.tracks[0];
                if(queue.trackloop || queue.queueloop && !queue.skipped) {
                    if(queue.tracks[0]?.resource) player.play(createAudioResource(queue.tracks[0].resource))
                    else player.play(getResource(queue, queue.tracks[0].id));
                } else {
                    if(queue.skipped) queue.skipped = false;
                    if(queue.stopped) {
                        // if there is a voice-response resource, play it
                        if(queue.tracks[0]?.resource) {
                            const track = queue.tracks.shift();
                            if(track?.resource) return player.play(createAudioResource(track.resource));
                        } 
                        
                        // get the bot's voice Connection
                        const meChannel = client.guilds.cache.get(queue.guildId)?.members?.me?.voice?.channel;
                        if(meChannel) leaveVoiceChannel(meChannel);
                        else { // else fetch the voicechannel and leave it
                            const vc = await client.channels.fetch(queue.voiceChannel).catch(() => null);
                            if(vc) leaveVoiceChannel(vc);
                        }

                        // send a status update if possible
                        const textChannel = await client.channels.fetch(queue.textChannel).catch(() => null);
                        if(textChannel) textChannel.send({ 
                            content: translate(client, textChannel.guild.id, "STOPPED")
                        }).catch(() => null);
                        return;
                    }
                    queue.tracks = [];
                    // Queue Empty, do this
                    const textChannel = await client.channels.fetch(queue.textChannel).catch(() => null);
                    if(textChannel) {
                        textChannel.send({
                            content: translate(client, textChannel.guildId, "QUEUE_EMPTY", msUnix(Date.now() + settings.leaveEmptyVC))
                        }).catch(console.warn)
                    }
                    setTimeout(async () => {
                        const nqueue = client.queues.get(queue.guildId);
                        if(!nqueue?.tracks?.length) {
                            // get the bot's voice Connection
                            const meChannel = client.guilds.cache.get(queue.guildId)?.members?.me?.voice?.channel;
                            if(meChannel) leaveVoiceChannel(meChannel);
                            else { // else fetch the voicechannel and leave it
                                const vc = await client.channels.fetch(queue.voiceChannel).catch(() => null);
                                if(vc) leaveVoiceChannel(vc);
                            }
                        } else console.log(nqueue);
                        return;
                    }, settings.leaveEmptyVC)
                }
            } else {
                // get the bot's voice Connection
                const meChannel = client.guilds.cache.get(queue.guildId)?.members?.me?.voice?.channel;
                if(meChannel) leaveVoiceChannel(meChannel);
                else { // else fetch the voicechannel and leave it
                    const vc = await client.channels.fetch(queue.voiceChannel).catch(() => null);
                    if(vc) leaveVoiceChannel(vc);
                }
                // send a queue textchannel update
                const textChannel = await client.channels.fetch(queue.textChannel).catch(() => null);
                if(textChannel) textChannel.send({ content: translate(client, textChannel.guildId, "LEFT_VC") }).catch(() => null);
                return;
            }
        } catch (e) { console.error(e) }
    }
    return;
} 

/**
 * Sends a Queue Update to the queue channel
 * @param {Client} client 
 * @param {string} guildId 
 * @returns {void}
 */
const sendQueueUpdate = async (client, guildId) => {
    const queue = client.queues.get(guildId);
    if(!queue || !queue.tracks || queue.tracks.length == 0 || !queue.textChannel) return 
    
    const textChannel = await client.channels.fetch(queue.textChannel).catch(() => null);
    if(!textChannel) return

    const song = queue.tracks[0];
    const embed = new EmbedBuilder().setColor(Color.Main)
        .setURL(getYTLink(song.id))
        .setTitle(`▶️ Now playing __${song.title}__`)
        .setFields([
            {
                name: `**Duration:**`, inline: true, 
                value: `> \`${song.durationFormatted}\``,
            },
            {
                name: `**Requester:**`, inline: true,
                value: `> ${song.requester} \`${song.requester.tag}\``
            },
            {
                name: `**Artist:**`, inline: true,
                value: `> ${song.channel?.name ? `[${song.channel.name}](${song.channel.url})` : `\`Unknown\``}`
            }
        ]);
    if(song?.thumbnail?.url) embed.setThumbnail(`${song?.thumbnail?.url}`);

    textChannel.send({
        embeds: [ embed ]
    }).catch(console.warn)
    return;
}

/**
 * Merge song and requester together
 * @param {*} song 
 * @param {User} requester 
 * @returns Object of song and requester
 */
const createSong = (song, requester) => {
    return { ...song, requester }
}

/**
 * Formats the song index to a readable string
 * @param {number} length 
 * @returns String
 */
const queuePos = (length) => {
    const str = {
        1: "st",
        2: "nd",
        3: "rd",
    }
    return `${length}${str[length % 10] ? str[length % 10] : "th"}`
}

/**
 * Creates a Queue Object for the voicechannel, textchannel and guildId
 * @param {*} song 
 * @param {User} user 
 * @param {string} channelId 
 * @param {VoiceChannel} voiceChannel 
 * @param {number} bitrate 
 * @returns a Queue-Object
 */
const createQueue = (song, user, channelId, voiceChannel, bitrate = 128) => {
    return {
        guildId: voiceChannel.guildId,
        voiceChannel,
        textChannel: channelId,
        paused: false,
        skipped: false,
        effects: {
            bassboost: 0,
            subboost: false,
            mcompand: false,
            haas: false,
            gate: false,
            karaoke: false,
            flanger: false,
            pulsator: false,
            surrounding: false,
            "3d": false,
            vaporwave: false,
            nightcore: false,
            phaser: false,
            normalizer: false,
            speed: 1,
            tremolo: false,
            vibrato: false,
            reverse: false,
            treble: false,
        },
        trackloop: false,
        queueloop: false,
        filtersChanged: false,
        volume: 15, // queue volume, between 1 and 100
        tracks: [ createSong(song, user) ],
        previous: undefined,
        creator: user,
        bitrate: bitrate
    }
}
module.exports = { 
    validVCTypes,
    joinVoiceChannelUtil,
    m2, m3, formatDuration, getYTLink, leaveVoiceChannel, getResource, playSong,
    sendQueueUpdate, createSong, queuePos, createQueue
}