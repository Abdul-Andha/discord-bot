module.exports = {
    name: 'copy',
    description: 'Copies a channel to another channel in another server.',
    execute(bot, receivedMessage, args) {
        receivedMessage.channel.send("copy test 1");
        let targetChannel = bot.channels.cache.get(547594143807963138);
        targetChannel.send("copy test 2");
    }
}