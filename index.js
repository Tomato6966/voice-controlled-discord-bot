const { createAudioResource } = require("@discordjs/voice");
const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { clientData } = require("./utils/constants/clientData.js");
require("dotenv").config();

const client = new Client(clientData);

// load modules
readdirSync(`./extenders`).filter(x => x.endsWith(".js")).forEach(fileName => require(`./extenders/${fileName}`)(client));
readdirSync(`./events`).filter(x => x.endsWith(".js")).forEach(fileName => require(`./events/${fileName}`)(client));
readdirSync(`./commands`).filter(x => x.endsWith(".js")).forEach(fileName => client.commands.set(fileName.toLowerCase().replace(".js", ""), require(`./commands/${fileName}`)))
readdirSync(`./commandResponses`).filter( x => x.endsWith(".mp3")).forEach(fileName => client.commandResponses.set(fileName.toLowerCase().replace(".mp3", ""), {title: "infoActionAudio", resource: createAudioResource(`./commandResponses/${fileName}`)}))
// Log in with the process.env.DISCORD_TOKEN Variable
client.login();