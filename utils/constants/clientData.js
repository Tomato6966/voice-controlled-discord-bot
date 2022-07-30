const { GatewayIntentBits, Partials } = require("discord.js");
const { Status } = require("./settingsData.js");
const clientData = {
    intents: [ 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMessages
    ],
    allowedMentions: {
        parse: ["roles", "users", /* "everyone" */],
        repliedUser: false, //set true if you want to ping the bot on reply messages
    },
    failIfNotExists: false,
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.ThreadMember],
    presence: { activities: [Status.activities[0]], status: Status.state }
};

module.exports = { clientData };