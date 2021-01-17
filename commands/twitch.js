module.exports = {
    name: 'twitch',
    description: 'Checks every minute if people on a list are live. Announces if they are.',
    execute(bot, twitch, sheet) {
        checkLive(bot, twitch, sheet);
    }
}

async function checkLive(bot, twitch, sheet) {
    const streams = await twitch.getStreams({ channel: "HBomb94"});
    if (streams.data.length == 0) {
        return;
    }

    targetRows = await findRow("HBomb94", sheet);
    if (targetRows[0].ID != streams.data[0].id) {
        announceLive(bot);
    }
}

function announceLive(bot) {
    const privateBotuse = bot.channels.cache.find(channel => channel.id === "738607225680953354");
    privateBotuse.send("Live");
}

async function findRow(arg, sheet) {
    let targetRows = [];
    let rows = await sheet.getRows();
    await sheet.loadCells(`A2:G${rows.length + 1}`);
    for (let i = 1; i < rows.length + 1; i++)
        for (let j = 0; j < 2; j++)
            if (arg === sheet.getCell(i, j).value.toString())
                if (!targetRows.includes(rows[i - 1]))
                    targetRows.push(rows[i - 1]);
    return targetRows;
}