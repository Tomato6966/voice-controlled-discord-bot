const { Emojis } = require("../utils/constants/settingsData.js");
const { newLiner, parseChannelMention, parseUserMention } = require("../utils/botUtils.js");
module.exports = { 
    MISSING_PERMS: `${Emojis.cross.str} Il vous manque des autorisations pour cette commande`,

    PREFIXINFO: (prefix) => `${Emojis.check.str} **Mon préfixe ici est \`${prefix}\`**`,

    LANGUAGE: (newlangstring) => `${Emojis.check.str} Changement de la langue en **${newlangstring}**`,
    TIME_ENDED: `Time ran out`,


    JOIN_VC: `${Emojis.warn.str} **Veuillez d'abord rejoindre une chaîne**`,
    ALREADY_CONNECTED: (channelId) => `${Emojis.denied.str} **Je suis déjà connecté à ${parseChannelMention(channelId)}**!`,
    MISSING_PERMS: (permString) => `${Emojis.denied.str} **Il me manque l'autorisation de "${permString}" dans votre canal vocal!**`,

    COULD_NOT_JOIN: (channelId) => `${Emojis.cross.str} **Je n'ai pas pu me connecter à ${parseChannelMention(channelId)}.**`,

    CONTROLLING: (possibleCommands) => {
        return newLiner(
            `${Emojis.check.str} **Vous contrôlez maintenant le Bot!**`,
            `__Commandes possibles:__`,
            `> ${possibleCommands}`,
            `__Comment exécuter une commande?__`,
            `> *Dites-le en prononçant un mot-clé, puis la commande et la requête! (En anglais)*`,
            `> Exemple: \`\`\`bot play shape of you\`\`\``,
            `>>> Conseils pour être compris:`,
            `-) Ne faites pas de pause`,
            `-) Pas de bruit de fond`,
            `-) Discours Normalement plutôt rapide et clair`,
            `-) Assurez-vous que PERSONNE ne parle (pas même un BOT)`,
            `\n> *Vous pouvez toujours m'utiliser avec des commandes comme d'habitude!*`,
            );
    },
    PING: (ping) => `🏓 Mon **API-RESPONSE-TIME** est de **${ping}ms**`,
    NOWLISTENING: (usertag, time) => `👂 **Écoutez maintenant ${usertag}**\n> *La prochaine entrée peut être prise <t:${time}:R>*`,
    QUEUE_EMPTY: (time) => `${Emojis.empty.str} **La file d'attente est vide**\n> Je vais quitter la chaîne <t:${time}:R>`,
    LEFT_VC: `👋 **A quitté le VoiceChannel**`,
    NOT_CONNECTED: `${Emojis.denied.str} **Je ne suis pas connecté quelque part!**`,
    NOTHING_PLAYING: `${Emojis.denied.str} **Rien en cours de lecture pour le moment**`,
    NOTHING_TO_SKIP: `${Emojis.denied.str} **Rien à sauter**`,
    SKIPPED: `${Emojis.skip.str} **A sauté la piste avec succès**`,
    STOPPED: `${Emojis.stop.str} **Arrêt de la lecture réussi et effacement de la file d'attente.**`,
    NOT_CONTROLLING: (prefix) => `${Emojis.cross.str} **Vous n'êtes pas celui qui contrôle le bot via \`${prefix}control\`**`,
    FILTER: (state, filter) => `🎚 **${state ? "ajouté" : "supprimé"} le \`${filtre}\` Filtre.**`,

    INVALID_VOL: `${Emojis.cross.str} **Invalide / Aucun volume ajouté!**\n> Ajoutez un pourcentage entre \`0\` et \`150\` !`,
    VOLUME: (vol) => `${Emojis.check.str} **Modification du volume en${vol}%**`,

    RESUMED: `▶️ **Reprise réussie de la piste**`,
    NOT_PAUSED: `👎 **La piste n'est pas en pause**`,
    PAUSED: `⏸️ **Mise en pause réussie de la piste**`,
    NOT_RESUMED: `👎 **Piste déjà en pause**`,

    CLEAREDQUEUE: `🪣 **La file d'attente a été effacée avec succès.**`,
}