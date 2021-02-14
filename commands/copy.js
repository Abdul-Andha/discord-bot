module.exports = {
    name: 'copy',
    description: 'Copies a channel to another channel in another server.',
    execute(bot, receivedMessage, args) {
        let quotesChannel = bot.channels.cache.find(channel => channel.id === "531298362545274930");
        console.log(quotesChannel.messages.cache);
        let targetChannel = bot.channels.cache.find(channel => channel.id === "547594143807963138");
        targetChannel.send("copy test 2");
    }
}