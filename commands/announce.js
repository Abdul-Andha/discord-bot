const Discord = require(`discord.js`);
module.exports = {
    name: 'announce',
    description:'Requires three arguments. The first argument must be a channel. The second argument must be the title. The third argument must be the message. The bot will announce the specified message to the specified channel.',
    execute(bot, receivedMessage, args) {
        let title;
        let msgStart = 2;
        if (args.length < 3)
            return receivedMessage.channel.send("Error: Not enough arguments. Try ~announce **Channel** **(Title)** **Message**");

        if (args[1].indexOf("(") != -1) {
            title = args[1].substr(1);
            let end = false;
            let count = 2;
            while (!end) {
                if (count > args.length - 1) {
                    return receivedMessage.channel.send("Error: No closing quote found. Only use quotes for multiple word titles.");
                }
                if (args[count].indexOf(")") != -1) {
                    title += " " + args[count].substr(0, args[count].length - 1);
                    end = true;
                } else {
                    title += " " + args[count];
                }
                count++;
                msgStart = count;
            } 
        } else {
            title = args[1];
        }
        
        for (let i = msgStart + 1; i < args.length; i++)
            args[msgStart] += " " + args[i];
        const outputMessage = new Discord.MessageEmbed();
        outputMessage.setColor("#3381ff");
        outputMessage.setTitle(title);
        outputMessage.setImage(receivedMessage.attachments.first().attachment);
        outputMessage.setDescription(args[msgStart]);
        args[0] = args[0].substr(2);
        args[0] = args[0].substr(0, args[0].length - 1);
        targetChannel = bot.channels.cache.get(args[0]);
        try {
            targetChannel.send(outputMessage);
            targetChannel.send("@everyone");
          }
          catch(err) {
            receivedMessage.channel.send("Error: That channel does not exist. Use #channel-name format.");
          }
    }
}