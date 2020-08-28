const Discord = require(`discord.js`);
module.exports = {
    name: 'message',
    description: 'Requires two arguments. The first argument must be a channel. The second argument must be the message. The bot will send the specified message to the specified channel.',
    execute(receivedMessage, args) {
        const outputMessage = new Discord.MessageEmbed();
        outputMessage.setColor("");
        outputMessage.setTitle("");
        outputMessage.setDescription(args[2]);
        receivedMessage.channel.send(outputMessage);
    }
}