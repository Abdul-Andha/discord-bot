const Discord = require(`discord.js`);
module.exports = {
    name: 'test',
    description: 'Just a test.',
    execute(receivedMessage) {
        const outputMessage = new Discord.MessageEmbed();
        outputMessage.setColor("#3381ff");
        outputMessage.setFooter("Made by Thunder");
        outputMessage.setTitle("**__TIC-TAC-TOE__**");
        outputMessage.setDescription("**_**|**_**|**_**\n**_**|**_**|**_**\n**.**|**.**|**.**");
        receivedMessage.channel.send(outputMessage);
    }
}