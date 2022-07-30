const { Status } = require("../utils/constants/settingsData.js");

module.exports = async client => {
    client.on("ready", () => {
        let statusCounter = 0;
        setInterval(() => {
            client.user.setActivity(Status.activities[statusCounter++]);
            if(statusCounter >= Status.activities.length - 1) statusCounter = 0;
            setTimeout(() => {
                const ram = (process.memoryUsage().heapUsed/1024/1024).toFixed(0) + "mb";
                const rssRam = (process.memoryUsage().rss/1024/1024).toFixed(0) + "mb";
                console.table({ram, rssRam})
            }, 500);
        }, Status.editInterval);
    
        console.table({
            State: ` -- READY -- `,
            Bot: client.user.tag,
            Id: client.user.id,
            Guilds: client.guilds.cache.size,
            Members: client.guilds.cache.map(g => g.memberCount).reduce((a,b) => a+b,0),
        });
    });
}