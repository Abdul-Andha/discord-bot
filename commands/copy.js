const Discord = require(`discord.js`);

module.exports = {
    name: 'copy',
    description: 'Copies a channel to another channel in another server.',
    execute(bot, receivedMessage, args) {
        getMessageCollection(bot, "531298362545274930");
        // sendMessages();
    }
}

async function getMessageCollection(bot, channelID) {
    let quotesChannel = bot.channels.cache.find(channel => channel.id === channelID);
    let msgCollection = await quotesChannel.messages.fetch({ limit: 10 });
    console.log(msgCollection);
}

function sendMessages(collection, channelID) {
    
}