module.exports = {
    name: 'cookie clicker',
    description: 'Classic Cookie Clicker Game. Consists of creating a profile, doing a command to "click" the cookie, buying upgrades, leaderboard.',
    execute(receivedMessage, args, sheet) {
        if (args.length === 0)
            clickCookie(receivedMessage);
    }
}

async function clickCookie(receivedMessage) {
    let rows = await sheet.getRows();
    console.log(rows.length);
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