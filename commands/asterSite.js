module.exports = {
    name: 'asterSite',
    description: 'Sends link to AsterGG.com',
    execute(receivedMessage) {
        return receivedMessage.channel.send("https://astergg.com");
    }
}