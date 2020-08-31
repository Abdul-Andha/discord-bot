const Discord = require(`discord.js`);
module.exports = {
    name: 'message',
    description:'Requires three arguments. The first argument must be a channel. The second argument must be the title. The third argument must be the message. The bot will send the specified message to the specified channel.',
    execute(bot, receivedMessage, args) {
        if (args.length < 3)
            return receivedMessage.channel.send("Error: Not enough arguments. Try ~message **[Channel]** **[Title]** **[Message]**");
        if (args.length > 3)
            for (let i = 3; i < args.length; i++)
                args[2] += " " + args[i];
        const outputMessage = new Discord.MessageEmbed();
        outputMessage.setColor("#3381ff");
        outputMessage.setTitle(args[1]);
        outputMessage.setDescription(args[2]);
        args[0] = args[0].substr(2);
        args[0] = args[0].substr(0, args[0].length - 1);
        targetChannel = bot.channels.cache.get(args[0]);
        try {
            targetChannel.send(outputMessage);
          }
          catch(err) {
            receivedMessage.channel.send("Error: That channel does not exist. Try ~message **[Channel]** **[Title]** **[Message]**");
          }
    }
}