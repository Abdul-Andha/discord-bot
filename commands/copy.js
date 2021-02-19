const Discord = require(`discord.js`);

module.exports = {
    name: 'copy',
    description: 'Copies a channel to another channel in another server.',
    execute(bot, receivedMessage, args) {
        msgCollection = getMessageCollection(bot, "531298362545274930");
        // sendMessages(bot, msgCollection, "811716564147109935");
    }
}

async function getMessageCollection(bot, channelID) {
    let quotesChannel = bot.channels.cache.find(channel => channel.id === channelID);
    let targetChannel = bot.channels.cache.find(channel => channel.id === "811716564147109935");
    
    quotesChannel.messages.fetch({ limit: 10 })
    .then(messages => console.log(messages.get('*1')))
    .catch(console.error);


}

// function sendMessages(bot, collection, channelID) {
//     let targetChannel = bot.channels.cache.find(channel => channel.id === channelID);
//     console.log(collection{1}.content);
//     targetChannel.send(collection[1].content);
// }