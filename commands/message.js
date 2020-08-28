const Discord = require(`discord.js`);
module.exports = {
    name: 'Message',
    description: 'Requires two arguments. The first argument must be a channel. The second argument must be the message. The bot will send the specified message to the specified channel.',
    execute(receivedMessage) {
        const outputMessage = new Discord.MessageEmbed();
        outputMessage.setColor("#3381ff");
        outputMessage.setTitle("**__TIC-TAC-TOE__**");
        outputMessage.setDescription("**_**|**_**|**_**\n**_**|**_**|**_**\n**.**|**.**|**.**");
        receivedMessage.channel.send(outputMessage);
    }
}