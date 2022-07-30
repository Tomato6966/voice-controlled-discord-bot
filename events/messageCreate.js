const { settings } = require("../utils/constants/settingsData.js");
const { translate } = require("../utils/language.js");
const { escapeRegex } = require("../utils/botUtils.js");
module.exports = async client => {
    const validMessageCommands = [...settings.prefixCommands, "ping"];
    // The Event    
    client.on("messageCreate", async (message) => {
        if(!message.guild || message.author.bot) return;
        // ensure the Database
        client.db.ensure(message.guildId, { prefix: (process.env.DEFAULTPREFIX ?? "!") });
        // get the database prefix
        const prefix = client.db.get(message.guildId, "prefix")
        // prefix regex for matching the message content
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        // if it's not a command, then return
        if (!prefixRegex.test(message.content)) return;
        // get the used Prefix ("@bot" / "!")
        const [, usedPrefix] = message.content.match(prefixRegex);
        // format the message content for cmd and args
        const [ cmdName, ...args ] = message.content.slice(usedPrefix.length).trim().split(/ +/g);
        // if no commandName input, but a bot ping, return info
        if (!cmdName?.length) {
            if (usedPrefix.includes(client.user.id)) return message.reply({ 
                content: translate(client, message.guild, "PREFIXINFO", prefix)
            }).catch(() => null);
            return;
        }
        // find the right command 
        const command = client.commands.get(cmdName?.toLowerCase()) || client.commands.find(c => !!c.aliases?.includes(cmdName?.toLowerCase()))
    
        // execute the command, if it's valid
        if(command) {
            if(!validMessageCommands.includes(command.name)) {
                if(client.listenAbleUsers.size > 0 && !client.listenAbleUsers.has(message.author.id)) {
                    return message.reply({
                        content: translate(client, message.guild, "NOT_CONTROLLING", prefix)
                    })
                }
            }
            // client, args, user, channel, voiceChannel, message, prefix
            command.execute(client, args, message.author, message.channel, message.member.voice.channel, message, prefix);
        }
    });
}