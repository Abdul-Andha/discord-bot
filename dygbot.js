const Discord = require(`discord.js`);
const bot = new Discord.Client();
const fs = require(`fs`)
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

let tagSheet;

async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet('1cRFU5w8xfBeVtm4GiZwWVO8b8HOKZW0wU-QGk9ugwGA');
    await doc.useServiceAccountAuth(creds);
    const info = await doc.loadInfo();
    tagSheet = doc.sheetsByIndex[0];
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
perms = ["152207704545296384", "332660732539961368", "322776121089196033", "177542487278092289"];
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let mainCommand = splitCommand[0];
    let args = splitCommand.slice(1);
    if (mainCommand === "DyG" || mainCommand === "dyg" || mainCommand === "Dyg")
        bot.commands.get('dyg').execute(receivedMessage);
    else if (mainCommand === "choose")
        bot.commands.get('choose').execute(receivedMessage, args);
    else if (mainCommand === "excuse")
        bot.commands.get('excuse').execute(receivedMessage, args);
    else if (mainCommand === "tag" && receivedMessage.author.id == "152207704545296384")
        bot.commands.get('tag').execute(receivedMessage, args, tagSheet);
    else if (mainCommand === "help")
        bot.commands.get('help').execute(receivedMessage, args);
    else if (mainCommand === "message" && perms.includes(receivedMessage.author.id))
        bot.commands.get('message').execute(bot, receivedMessage, args);
    else if (mainCommand === 'announce' && perms.includes(receivedMessage.author.id))
        bot.commands.get('announce').execute(bot, receivedMessage, args);
    else if (mainCommand === "rps")
        bot.commands.get('rps').execute(receivedMessage, args);
    else if (mainCommand === "cookie" || mainCommand === "c")
        bot.commands.get('cookie clicker').execute(receivedMessage, args);
    else receivedMessage.channel.send("Unknown Command ");
}

bot.login(process.env.token);
