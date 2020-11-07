module.exports = {
    name: 'cookie clicker',
    description: 'Classic Cookie Clicker Game. Consists of creating a profile, doing a command to "click" the cookie, buying upgrades, leaderboard.',
    execute(receivedMessage, args, sheet) {
        let temp = {
            Alias: "Test",
            Discord: "Testing",
            Reason: "Testor",
            Date: "Tested",
            ID: "Toast",
            IGN: "Testn't"
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