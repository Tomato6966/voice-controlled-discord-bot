const Color = require("./Color.js")
const Status = require("./Status.js");
const Emojis = require("./Emojis.js");

module.exports = {
    Status,
    Color,
    settings: {
        listeningCooldown: 3_500,
        prefixCommands: [ "control", "language", "prefix" ],
        leaveEmptyVC: 60_000,
        validVoiceKeyWords: ["bot","client","voice", `speech`, `beach`, `each`, `peach`]
    },
    Emojis
}
