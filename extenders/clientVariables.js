const { Collection } = require("discord.js");
const Enmap = require("enmap");
module.exports = async client => {
    client.commands = new Collection();
    client.queues = new Collection();
    client.commandResponses = new Collection();
    client.listenAbleUsers = new Set(); // add delete size
    client.db = new Enmap({
        name: "maindb",
        dataDir: "./databases/main"
    });
}