const Discord = require(`discord.js`);

module.exports = {
    name: 'copy',
    description: 'Copies a channel to another channel in another server.',
    execute(bot, receivedMessage, args) {
        testing(bot);
        
    }
}

async function testing(bot) {
    console.log("test1");
    let quotesChannel = bot.channels.cache.find(channel => channel.id === "531298362545274930");
    let test = await quotesChannel.messages.fetch();
    console.log(test);
    let targetChannel = bot.channels.cache.find(channel => channel.id === "547594143807963138");
    targetChannel.send("copy test 2");
    targetChannel.send(test.content);
    console.log("test");
}