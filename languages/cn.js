const { Emojis } = require("../utils/constants/settingsData.js");
const { newLiner, parseChannelMention, parseUserMention } = require("../utils/botUtils.js");
module.exports = { 
    MISSING_PERMS: `${Emojis.cross.str} 您缺少此命令的权限`,

    PREFIXINFO: (prefix) => `${Emojis.check.str} **我这里的前缀是\`${prefix}\`**`,

    LANGUAGE: (newlangstring) => `${Emojis.check.str} 将语言更改为 **${newlangstring}**`,
    TIME_ENDED: `Time ran out`,


    JOIN_VC: `${Emojis.warn.str} **请先加入频道**`,
    ALREADY_CONNECTED: (channelId) => `${Emojis.denied.str} **我已经连接了 ${parseChannelMention(channelId)}**!`,
    MISSING_PERMS: (permString) => `${Emojis.denied.str} **我在您的语音频道中缺少 “${permString}” 的权限！**`,

    COULD_NOT_JOIN: (channelId) => `${Emojis.cross.str} **我无法连接到 ${parseChannelMention(channelId)}。**`,

    CONTROLLING: (possibleCommands) => {
        return newLiner(
            `${Emojis.check.str} **您现在正在控制机器人！**`,
            `__可能的命令:__`,
            `> ${possibleCommands}`,
            `__如何执行命令？__`,
            `> *说出它，说出一个关键字，然后说出命令和查询！ （用英语讲）*`,
            `> 示例：\`\`\`bot play shape of you\nbot skip\nbot stop\nbot nightcore\nbot play no diggity\nbot play believer\`\`\``,
            `>>> 不要停顿:`,
            `-) 不要停顿`,
            `-) 无背景噪音`,
            `-) 语音通常相当快速和清晰`,
            `-) 确保没有人说话（甚至不是机器人）`,
            `\n> *你仍然可以像往常一样使用我的命令!*`,
            );
    },
    PING: (ping) => `🏓 我的 **API-RESPONSE-TIME** 是 **${ping}ms**`,
    NOWLISTENING: (usertag, time) => `👂 **现在正在收听 ${usertag}**\n> *可以获取下一个输入 <t:${time}:R>*`,
    QUEUE_EMPTY: (time) => `${Emojis.empty.str} **队列为空**\n> 我将离开频道 <t:${time}:R>`,
    LEFT_VC: `👋 **Left the VoiceChannel**`,
    NOT_CONNECTED: `${Emojis.denied.str} **我没有连接到某个地方！**`,
    NOTHING_PLAYING: `${Emojis.denied.str} **现在没有播放**`,
    NOTHING_TO_SKIP: `${Emojis.denied.str} **没有什么可跳过的**`,
    SKIPPED: `${Emojis.skip.str} **成功跳过赛道**`,
    STOPPED: `${Emojis.stop.str} **成功停止播放并清除队列。**`,
    NOT_CONTROLLING: (prefix) => `${Emojis.cross.str} **您不是通过 \`${prefix}control\` 控制机器人的人**`,
    FILTER: (state, filter) => `🎚 **成功 ${state ? "添加" : "移除"} \`${filter}\` 过滤器。**`,

    INVALID_VOL: `${Emojis.cross.str} **无效/未添加音量！**\n> 在 \`0\` 和 \`150\` 之间添加一个百分比！`,
    VOLUME: (vol) => `${Emojis.check.str} **将音量更改为 ${vol}%**`,

    RESUMED: `▶️ **成功恢复赛道**`,
    NOT_PAUSED: `👎 **曲目未暂停**`,
    PAUSED: `⏸️ **已成功暂停曲目**`,
    NOT_RESUMED: `👎 **曲目已暂停**`,

    CLEAREDQUEUE: `🪣 **成功清空队列.**`,
}