module.exports = {
    name: 'cookie clicker',
    description: 'Classic Cookie Clicker Game. Consists of creating a profile, doing a command to "click" the cookie, buying upgrades, leaderboard.',
    execute(receivedMessage, args, sheet) {
        let temp = {
            Name: "Test",
            CookieCount: "Testing",
            CookiesPerSec: "Testor",
            CookiesPerClick: "Tested",
            GrandmaCount: "Toast",
            Time: "Testn't"
        };
        sheet.addRow(temp);
    }
}

// name 
// cookieCount
// cookiesPerSecond
// grandmaCount
// cookiesPerClick
// clickUpgrades