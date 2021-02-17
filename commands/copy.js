const Discord = require(`discord.js`);

module.exports = {
    name: 'copy',
    description: 'Copies a channel to another channel in another server.',
    execute(bot, receivedMessage, args) {
        msgCollection = getMessageCollection(bot, "531298362545274930");
        sendMessages(bot, msgCollection, "811716564147109935");
    }
}

async function getMessageCollection(bot, channelID) {
    let quotesChannel = bot.channels.cache.find(channel => channel.id === channelID);
    let msgCollection = await quotesChannel.messages.fetch({ limit: 10 });
    return msgCollection;
}

function sendMessages(bot, collection, channelID) {
    let targetChannel = bot.channels.cache.find(channel => channel.id === channelID);
    collection.forEach(msg => {
        console.log(msg.content);
        targetChannel.send(msg.content);
    });
}