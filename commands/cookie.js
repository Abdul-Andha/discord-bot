const weather = require('weather-js');
let date;
    weather.find({search: 'Brooklyn, NY', degreeType: 'F'}, function (err, result) {
        if (err) console.log(err);
        date = result;
    });

module.exports = {
    name: 'cookie clicker',
    description: 'Classic Cookie Clicker Game. Consists of creating a profile, doing a command to "click" the cookie, buying upgrades, leaderboard.',
    execute(receivedMessage, args, sheet) {
        if (args.length === 0)
            clickCookie(receivedMessage, sheet);
    }
}

async function clickCookie(receivedMessage, sheet) {
    targetRow = await findRow(receivedMessage.member.id, sheet);
    if (targetRow.length === 0) {
        createProfile(receivedMessage, sheet);
    } else if (targetRow.length === 1) {
        console.log(1);
        console.log(targetRow[0].Time);
        console.log(targetRow[0].CookieCount);
        console.log(targetRow[0].CookiesPerClick);
        console.log(targetRow[0].CookiesPerSec);
        console.log(targetRow[0].ID);

        let secsPassed = Math.floor((Date.now() - targetRow.Time) / 1000);
        targetRow[0].CookieCount = targetRow[0].CookieCount + (targetRow[0].CookiesPerSec * secsPassed);
        targetRow[0].save();
    }
}

async function createProfile(receivedMessage, sheet) {
    let newRow = {
        Name: receivedMessage.member.user.username,
        CookieCount: 1,
        CookiesPerSec: 0,
        CookiesPerClick: 1,
        GrandmaCount: 0,
        Time: Date.now(),
        ID: receivedMessage.member.id
    };
    sheet.addRow(newRow); 
}

async function findRow(arg, sheet) {
    let targetRows = [];
    let rows = await sheet.getRows();
    await sheet.loadCells(`A2:G${rows.length + 1}`);
    for (let i = 1; i < rows.length + 1; i++)
        for (let j = 0; j < 7; j++)
            if (arg === sheet.getCell(i, j).value.toString())
                if (!targetRows.includes(rows[i - 1]))
                    targetRows.push(rows[i - 1]);
    return targetRows;
}


// name 
// cookieCount
// cookiesPerSecond
// grandmaCount
// cookiesPerClick
// clickUpgrades

// let temp = {
//     Name: "Test",
//     CookieCount: "Testing",
//     CookiesPerSec: "Testor",
//     CookiesPerClick: "Tested",
//     GrandmaCount: "Toast",
//     Time: "Testn't"