const { Emojis } = require("../utils/constants/settingsData.js");
const { newLiner, parseChannelMention, parseUserMention } = require("../utils/botUtils.js");
module.exports = { 
    MISSING_PERMS: `${Emojis.cross.str} You are missing Permissions for this Command`,

    PREFIXINFO: (prefix) => `${Emojis.check.str} **My Prefix here is \`${prefix}\`**`,

    LANGUAGE: (newlangstring) => `${Emojis.check.str} Changed the Language to **${newlangstring}**`,
    TIME_ENDED: `Time ran out`,


    JOIN_VC: `${Emojis.warn.str} **Please join a Channel first**`,
    ALREADY_CONNECTED: (channelId) => `${Emojis.denied.str} **I'm already connected in ${parseChannelMention(channelId)}**!`,
    MISSING_PERMS: (permString) => `${Emojis.denied.str} **I'm missing the Permission to "${permString}" in your Voice-Channel!**`,

    COULD_NOT_JOIN: (channelId) => `${Emojis.cross.str} **I could not connect to ${parseChannelMention(channelId)}.**`,

    CONTROLLING: (possibleCommands) => {
        return newLiner(
            `${Emojis.check.str} **You are now controlling the Bot!**`,
            `__Possible Commands:__`,
            `> ${possibleCommands}`,
            `__How to execute a Command?__`,
            `> *Say it, by saying a Keyword and then the Command and Query! (in English)*`,
            `> Example: \`\`\`bot play shape of you\`\`\``,
            `>>> Tipps to be understood:`,
            `-) Don't make pauses`,
            `-) No backgroundnoises`,
            `-) Speach Normally rather fast and Clear`,
            `-) Make sure that NOONE Speaks (not even a BOT)`,
            `\n> *You can still use me with commands as normal!*`,
            );
    },
    PING: (ping) => `🏓 My **API-RESPONSE-TIME** is **${ping}ms**`,
    NOWLISTENING: (usertag, time) => `👂 **Now listening to ${usertag}**\n> *Next input can be taken <t:${time}:R>*`,
    QUEUE_EMPTY: (time) => `${Emojis.empty.str} **Queue got empty**\n> I will leave the Channel <t:${time}:R>`,
    LEFT_VC: `👋 **Left the VoiceChannel**`,
    NOT_CONNECTED: `${Emojis.denied.str} **I'm not connected somewhere!**`,
    NOTHING_PLAYING: `${Emojis.denied.str} **Nothing playing right now**`,
    NOTHING_TO_SKIP: `${Emojis.denied.str} **Nothing to skip**`,
    SKIPPED: `${Emojis.skip.str} **Successfully skipped the Track**`,
    STOPPED: `${Emojis.stop.str} **Successfully stopped playing and cleared the Queue.**`,
    NOT_CONTROLLING: (prefix) => `${Emojis.cross.str} **You are not the one Controlling the Bot via \`${prefix}control\`**`,
    FILTER: (state, filter) => `🎚 **Successfully ${state ? "added" : "removed"} the \`${filter}\` Filter.**`,

    INVALID_VOL: `${Emojis.cross.str} **Invalid / No Volume Added!**\n> Add a percentage between \`0\` and \`150\`!`,
    VOLUME: (vol) => `${Emojis.check.str} **Changed the Volume to ${vol}%**`,

    RESUMED: `▶️ **Successfully resumed the Track**`,
    NOT_PAUSED: `👎 **Track is not paused**`,
    PAUSED: `⏸️ **Successfully paused the Track**`,
    NOT_RESUMED: `👎 **Track already paused**`,

    CLEAREDQUEUE: `🪣 **Successfully cleared the Queue.**`,
}