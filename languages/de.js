const { Emojis } = require("../utils/constants/settingsData.js");
const { newLiner, parseChannelMention, parseUserMention } = require("../utils/botUtils.js");
module.exports = { 
    MISSING_PERMS: `${Emojis.cross.str} Dir fehlt die Berechtigung diesen Befehl auszuführen`,

    PREFIXINFO: (prefix) => `${Emojis.check.str} **Mein Prefix lautet: \`${prefix}\`**`,

    LANGUAGE: (newlangstring) => `${Emojis.check.str} Sprache auf **${newlangstring}** geändert!`,
    TIME_ENDED: `${Emojis.timer.str} Zeit abgelaufen...`,

    JOIN_VC: `${Emojis.warn.str} **Bitte Verbinde dich mit einem Voice-Channel**`,
    ALREADY_CONNECTED: (channelId) => `${Emojis.denied.str} **Ich bin schon in ${parseChannelMention(channelId)} verbunden**!`,
    MISSING_PERMS: (permString) => `${Emojis.denied.str} **Mir fehlen die Berechtigung für "${permString}" in deinem Voice-Channel!**`,

    COULD_NOT_JOIN: (channelId) => `${Emojis.cross.str} **Ich konnte ${parseChannelMention(channelId)} nicht beitreten.**`,

    CONTROLLING: (possibleCommands) => {
        return newLiner(
            `${Emojis.check.str} **Du kontrollierst mich nun!**`,
            `__Mögliche Befehle:__`,
            `> ${possibleCommands}`,
            `__Wie führst du einen aus?__`,
            `> *Sag es einfach, sprich ein KEYWORD (voice, speech) und danach den BEFEHL mit deiner Anfrage aus! (in English)*`,
            `> Zum Beispiel: \`\`\`bot play shape of you\nbot skip\nbot stop\nbot nightcore\nbot play no diggity\nbot play believer\`\`\``,
            `>>> Tipps, dass ich dich besser verstehe:`,
            `-) Mach keine Sprechpausen`,
            `-) Minimiere Hintergrundgeräusche`,
            `-) Sprich normal, tendenziell schnell und deutlich`,
            `-) Stelle sicher, dass sonst niemand ausser dir spricht`,
            `\n> *Du kannst mich aber normal mit Commands noch verwenden!*`,
        );
    },
    PING: (ping) => `🏓 Meine **API-Antwort-Zeit** ist **${ping}ms**`,
    NOWLISTENING: (usertag, time) => `👂 **Höre nun ${usertag} zu!**\n> *Nächstes Input kann <t:${time}:R> passieren!*`,
    QUEUE_EMPTY: (time) => `${Emojis.empty.str} **Queue ist nun leer**\n> Ich werde den Channel in <t:${time}:R> verlassen`,
    LEFT_VC: `👋 **Talk verlassen**`,
    NOT_CONNECTED: `${Emojis.denied.str} **Ich bin niergends verbunden.**`,
    NOTHING_PLAYING: `${Emojis.denied.str} **Ich spiele zurzeit nichts ab.**`,
    NOTHING_TO_SKIP: `${Emojis.denied.str} **Es gibt nichts zum überspringen**`,
    SKIPPED: `${Emojis.skip.str} **Erfolgreich den Song übersprungen**`,
    STOPPED: `${Emojis.stop.str} **Erfolgreich gestoppt und die Queue gelöscht.**`,
    NOT_CONTROLLING: (prefix) => `${Emojis.cross.str} **Du kontrollierst nicht den Bot mit: \`${prefix}control\`**`,
    FILTER: (state, filter) => `🎚 **Der Filter \`${filter}\` wurde erfolgreich ${state ? "hinzugefügt" : "entfernt"}.**`,
    INVALID_VOL: `${Emojis.cross.str} **Keine / Falsche Lautstärke!**\n> Füge eine Lautstärke zw. \`0\` und \`150\` % hinzu!`,
    VOLUME: (vol) => `${Emojis.check.str} **Lautstärke auf ${vol}% geändert**`,
    RESUMED: `▶️ **Erfolgreich den Song forgesetzt**`,
    NOT_PAUSED: `👎 **Song ist nicht pausiert**`,
    PAUSED: `⏸️ **Erfolgreich den Song pausiert**`,
    NOT_RESUMED: `👎 **Song ist schon pausiert**`,
    CLEAREDQUEUE: `🪣 **Erfolgreich die Queue gelöscht.**`,
}