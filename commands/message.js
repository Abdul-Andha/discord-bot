const Discord = require(`discord.js`);
module.exports = {
    name: 'message',
    description: 'Requires two arguments. The first argument must be a channel. The second argument must be the message. The bot will send the specified message to the specified channel.',
    execute(receivedMessage, args) {
        if (args.length < 2)
            return receivedMessage.channel.send("Error: Not enough arguments. Try ~message **[Channel]** **[Message]**")
        if (args.length > 2)
            for (let i = 2; i < args.length; i++)
                args[1] += " " + args[i];
        const outputMessage = new Discord.MessageEmbed();
        outputMessage.setColor("");
        outputMessage.setTitle("");
        outputMessage.setDescription(args[1]);
        receivedMessage.channel.send(outputMessage);
    }
}