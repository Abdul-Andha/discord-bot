module.exports = {
    name: 'cookie clicker',
    description: 'Classic Cookie Clicker Game. Consists of creating a profile, doing a command to "click" the cookie, buying upgrades, leaderboard.',
    execute(receivedMessage, args, sheet) {
        if (args.length === 0)
            clickCookie(receivedMessage, sheet);
    }
}

async function clickCookie(receivedMessage, sheet) {
    let rows = await sheet.getRows();
    targetRow = findRow(receivedMessage.member.id, sheet);
    console.log("1");
    if (targetRow.length === 0) {
        console.log("2");
        let newRow = {
            Name: receivedMessage.member.userName,
            CookieCount: 1,
            CookiesPerSec: 0,
            CookiePerClick: 1,
            GrandmaCount: 0,
            Time: "test",
            ID: receivedMessage.member.id
        };
        sheet.addRow(newRow);
    } 
}

async function findRow(arg, sheet) {
    let targetRows = [];
    let rows = await sheet.getRows();
    await sheet.loadCells(`A2:F${rows.length + 1}`);
    for (let i = 1; i < rows.length + 1; i++)
        for (let j = 0; j < 6; j++)
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