const Discord = require(`discord.js`);
const {
    sheets
} = require("googleapis/build/src/apis/sheets");
const weather = require('weather-js');
let date;
weather.find({search: 'Brooklyn, NY', degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);
   
    date = (result[0].current.date);
  });

module.exports = {
    name: 'tag',
    description: 'Helps with managing the DyG tag. It can add, remove, show everyone in tag, or look someone up. Stores Alias, IGN, ID, Discord@, Date given, and Reason for tag',
    execute(receivedMessage, args, sheet) {
        if (args[0] === "add")
            addRow(receivedMessage, args, sheet);
        else if (args[0] === "remove")
            removeRow(receivedMessage, args, sheet);
        else if (args[0] === "find")
            showRow(receivedMessage, args, sheet);
        else if (args[0] === "members")
            showAllMembers(receivedMessage, args, sheet);
        else if (args[0] === "update")
            updateRow(receivedMessage, args, sheet);
        else receivedMessage.channel.send("Error: Unknown Command");
    }
}

function addRow(receivedMessage, args, sheet) {
    if (args.length < 6)
        return receivedMessage.channel.send("Error: Not enough arguments. Try /tag add **Alias Discord Reason ID IGN**");
    if (args.length > 6)
        for (let i = 6; i < args.length; i++)
            args[5] += " " + args[i];
    let temp = {
        Alias: args[1],
        Discord: args[2],
        Reason: args[3],
        Date: date,
        ID: args[4],
        IGN: args[5]
    };
    sheet.addRow(temp);
    receivedMessage.channel.send(`Added ${temp.Alias}`);
}

async function removeRow(receivedMessage, args, sheet) {
    if (args.length < 2)
        return receivedMessage.channel.send("Error: Not enough arguments. Try /tag remove **Alias**")
    if (args.length > 2)
        for (let i = 2; i < args.length; i++)
            args[1] += " " + args[i];
    let targetRows = await findRow(args[1], sheet);
    if (targetRows.length > 0) {
        for (let i = targetRows.length - 1; i > -1; i--)
            targetRows[i].delete();
        return receivedMessage.react('👍');
    }
    return receivedMessage.channel.send(`${args[1]} was not found.`);
}

async function showRow(receivedMessage, args, sheet) {
    if (args.length < 2)
        return receivedMessage.channel.send("Error: Not enough arguments. Try /tag find **Alias**")
    if (args.length > 2)
        for (let i = 2; i < args.length; i++)
            args[1] += " " + args[i];
    let targetRows = await findRow(args[1], sheet);

    let content = "";
    console.log(targetRows);
    for (let i = 0; i < targetRows.length; i++) {
        content += `${targetRows[i].Alias} | `;
        content += `${targetRows[i].IGN} | `;
        content += `${targetRows[i].ID} | `;
        content += `${targetRows[i].Discord} | `;
        content += `${targetRows[i].Reason}`;
        content += `\n**Added on:** ${targetRows[i].Date} \n`;
    }

    const outputMessage = new Discord.MessageEmbed();
    outputMessage.setColor("#3381ff");
    outputMessage.setFooter("Made by Thunder");
    if (content == "") {
        outputMessage.setTitle(`__**Not found**__`);
        outputMessage.setDescription(`${args[1]} was not found.`)
    } else {
        outputMessage.setTitle(`__**${args[1]}**__`);
        outputMessage.setDescription(content);
    }
    receivedMessage.channel.send(outputMessage);
}

async function showAllMembers(receivedMessage, args, sheet) {
    let rows = await sheet.getRows();
    const outputMessage = new Discord.MessageEmbed();
    outputMessage.setTitle("__**Dynamic Gaming Clantag**__");
    outputMessage.setColor("#3381ff");
    outputMessage.setFooter("Made by Thunder")
    let content = "";
    for (let i = 0; i < rows.length; i++) {
        content += `${rows[i].IGN} | `;
        content += `${rows[i].ID} | `;
        content += `${rows[i].Discord} | `;
        content += `${rows[i].Reason}`;
        content += "\n"
    }
    outputMessage.setDescription(content);
    receivedMessage.channel.send(outputMessage);
}

async function updateRow(receivedMessage, args, sheet) {
    if (args.length < 4)
        return receivedMessage.channel.send("Error: Not enough arguments. Try /tag update **[Alias]** **[What you are updating]** **[New Value]**")
    if (args.length > 4)
        for (let i = 4; i < args.length; i++)
            args[3] += " " + args[i];
    let targetRow = await findRow(args[1], sheet);
    if (args[2] === "Alias")
        targetRow[0].Alias = args[3];
    else if (args[2] === "IGN")
        targetRow[0].IGN = args[3];
    else if (args[2] === "ID")
        targetRow[0].ID = args[3];
    else if (args[2] === "Discord")
        targetRow[0].Discord = args[3];
    else if (args[2] === "Reason")
        targetRow[0].Reason = args[3];
    await targetRow[0].save();
}

async function findRow(arg, sheet) {
    let targetRows = [];
    let rows = await sheet.getRows();
    await sheet.loadCells(`A2:F${rows.length + 1}`);
    for (let i = 1; i < rows.length + 1; i++)
        for (let j = 0; j < 6; j++)
            if (arg === sheet.getCell(i, j).value.toString())
                targetRows.push(rows[i - 1]);

    return targetRows;
}