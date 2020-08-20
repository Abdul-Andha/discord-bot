module.exports = {
    name: 'dyg',
    description: 'Sends link to DyG will Reign',
    execute(receivedMessage) {
        return receivedMessage.channel.send("DyG will Reign! https://youtu.be/KI7MqsjpgpY");
    }
}