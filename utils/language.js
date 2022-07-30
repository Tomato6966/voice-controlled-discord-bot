const english = require("../languages/en.js");
const german = require("../languages/de.js");
const chinese = require("../languages/cn.js");
const french = require("../languages/fr.js");

const languages = {
    "en": english,
    "de": german,
    "cn": chinese,
    "fr": french,
}
const languageStrings = {
  "en" : {emoji: "🇬🇧", text: "English"},
  "de" : {emoji: "🇩🇪", text: "German"},
  "cn" : {emoji: "🇨🇳", text: "Chinese"},
  "fr" : {emoji: "🇫🇷", text: "French"}
}
function getLanguage(client, guildId) {
    try {
        const defaultLang = process.env.DEFAULT_LANGUAGE ?? "en";
        client.db.ensure(guildId, { language: defaultLang });
        const lang = client.db.get(guildId, "language") ?? "en";
        return Object.keys(languageStrings).includes(lang.trim()) ? lang.trim() : "en";
    } catch {
        return "en"
    }
}
function translate(client, guildId, key, ...params) {
    if(typeof guildId !== "string") {
        try {
            if(guildId?.guild) guildId = guildId.guild.id
            else guildId = guildId.id;
        } catch{ }
    }
    const language = getLanguage(client, guildId);
    let value = languages[language][key];
    // Was not able to be translated
    if (!value && language !== "en") value = languages.en[key] || key;
    if (Array.isArray(value)) return value.join("\n");
    if (typeof value === "function") return value(...(params || []));
    return value;
}
module.exports = {
    languages, languageStrings, translate, getLanguage
}