const Discord = require(`discord.js`);
const bot = new Discord.Client();
const fs = require(`fs`);
const TwitchAPI = require("node-twitch").default;
const twitch = new TwitchAPI({
    client_id: "2mtnu7kdr8a8ycya464gtwv06e5wac",
    client_secret: "icceuhbuze6mw66lirviq4mdo6f4zm"
});
const weather = require('weather-js');
const prefix = "~";
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

const {GoogleSpreadsheet} = require('google-spreadsheet');
const {promisify} = require('util');
const creds = require('./creds.json');

let tagSheet, cookieSheet, twitchSheet;

async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet('1cRFU5w8xfBeVtm4GiZwWVO8b8HOKZW0wU-QGk9ugwGA');
    await doc.useServiceAccountAuth(creds);
    const info = await doc.loadInfo();
    tagSheet = doc.sheetsByIndex[0];
    cookieSheet = doc.sheetsByIndex[1];
    twitchSheet = doc.sheetsByIndex[2];
    weeklyScoreSheet = doc.sheetsByIndex[3];
    eventScoreSheet = doc.sheetsByIndex[4];
}

accessSpreadsheet();

bot.on(`ready`, () => {
    console.log("Connected as " + bot.user.tag);
});

bot.on(`message`, (receivedMessage) => {
    if (receivedMessage.author == bot.user)
        return;
    if (receivedMessage.content.startsWith(prefix)) {
        processCommand(receivedMessage);
    }
})

let minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
    bot.commands.get('twitch').execute(bot, twitch, twitchSheet);
}, the_interval);

const perms = ["152207704545296384", "332660732539961368", "322776121089196033", "177542487278092289", "288875657641852929", "425816118809198593", "352557706097197057"];
//                thunder              smiley                 juice                 fire                  fatal                 vortex                auroraa
const scorePerms = ["152207704545296384", "179039130762608641", "761848395375181825", "177542487278092289"];
//                      thunder                 flame                 fresh

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let mainCommand = splitCommand[0].toLowerCase();
    let args = splitCommand.slice(1);
    if (mainCommand === "dyg")
        bot.commands.get('dyg').execute(receivedMessage);
    else if ((mainCommand === "aster" || mainCommand === "astr" || mainCommand === "aste"))
        bot.commands.get('asterSite').execute(receivedMessage);
    else if (mainCommand === "choose")
        bot.commands.get('choose').execute(receivedMessage, args);
    else if (mainCommand === "excuse")
        bot.commands.get('excuse').execute(receivedMessage, args);
    else if (mainCommand === "tag" && receivedMessage.author.id == "152207704545296384")
        bot.commands.get('tag').execute(receivedMessage, args, tagSheet);
    else if (mainCommand === "help" && (perms.includes(receivedMessage.author.id) || scorePerms.includes(receivedMessage.author.id)))
        bot.commands.get('help').execute(receivedMessage, args);
    else if (mainCommand === "message" && receivedMessage.author.id == "152207704545296384")
        bot.commands.get('message').execute(bot, receivedMessage, args);
    else if ((mainCommand === 'announce' || mainCommand === "a") && perms.includes(receivedMessage.author.id))
        bot.commands.get('announce').execute(bot, receivedMessage, args);
    else if ((mainCommand === 'tannounce' || mainCommand === 'ta') && perms.includes(receivedMessage.author.id))
        bot.commands.get('tannounce').execute(bot, receivedMessage, args);
    else if (mainCommand === "rps")
        bot.commands.get('rps').execute(receivedMessage, args);
    else if (mainCommand === "cookie" || mainCommand === "c")
        bot.commands.get('cookie clicker').execute(receivedMessage, args, cookieSheet);
    else if (mainCommand === "copy")
        bot.commands.get('copy').execute(bot, receivedMessage, args);
    else if ((mainCommand === "score" || mainCommand === "sb" || mainCommand === "s") && scorePerms.includes(receivedMessage.author.id))
        bot.commands.get('eventScoreBoard').execute(bot, receivedMessage, args, weeklyScoreSheet, eventScoreSheet);
    else receivedMessage.channel.send("Unknown Command");
}

async function checkStreams(channel) {
    // h channel.send(streams);
}

bot.login(process.env.token);

