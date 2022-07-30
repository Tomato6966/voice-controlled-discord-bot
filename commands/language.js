const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const { languageStrings, languages, translate } = require("../utils/language");
module.exports = {
    name: "language",
    description: "Change the Bot's language",
    execute: async (client, args, user, channel, voiceChannel, message, prefix) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply({
                content: translate(client, message.guildId, "MISSING_PERMS")
            })
        }
        
        client.db.ensure(message.guildId, { language: "en" });
        const lang = client.db.get(message.guildId, "language") ?? "en";
        const langs = Object.entries(languageStrings);
        const allcomps = [ ];
        for(let i = 0; i<= langs.length + 5; i+=5) {
            if(langs.length > i) {
                allcomps.push(new ActionRowBuilder().addComponents(langs.slice(i, i+5).map(([l, data]) => 
                    new ButtonBuilder().setStyle(lang == l ? ButtonStyle.Primary : ButtonStyle.Secondary).setDisabled(lang == l).setLabel(data.text).setEmoji(data.emoji).setCustomId(`language_${l}`)
                )));
            }
        }
        message.reply({
            content: `Pick your wished Language`,
            components: allcomps.slice(0, 5)
        }).then(msg => {
            var collector = msg.createMessageComponentCollector({ filter: (i) => i.user.id == message.author.id, time: 60_000 });
            collector.on('collect', async i => {
                const newlang = i.customId.split("_")[1]
                client.db.set(message.guildId, newlang, "language");
                i.update({
                    components: [],
                    content: translate(client, message.guildId, "LANGUAGE", `${languageStrings[newlang].emoji} ${languageStrings[newlang].text}`)
                });
            })
            collector.on("end", collected => {
                if(collected.size === 0) msg.edit({
                    components: [],
                    content: translate(client, message.guildId, "TIME_ENDED")
                }).catch(() => null)
            })
        })
    }
}