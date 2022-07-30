module.exports = {
    check: getEmoji("✅"),
    cross: getEmoji("❌"),
    denied: getEmoji("🚫"),
    warn: getEmoji("❗"),
    timer: getEmoji("🕛"),
    stop: getEmoji("🛑"),
    skip: getEmoji("⏭️"),
    empty: getEmoji("🤖"),
}
function getEmoji(str) {
    str = str.trim();
    if(str.includes("<")) {
        const splitted = str.replace(">", "").replace("<", "").split(":").reverse().filter(Boolean);
        const id = `${splitted[0]}`;
        const name = `${splitted[1]}`;
        const animated = splitted[2] && splitted[2] == "a" ? true : false
        return { id, name, animated, str: `${str}` }
    }
    return { id: undefined, str: `${str}`, name: `${str}`, animated: false }
}