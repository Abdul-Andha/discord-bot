const Discord = require(`discord.js`);
module.exports = {
  name: 'gannounce',
  description: 'Works like announce but does it in announcement channels across multiple servers. Format: ~ga (Title) Message',
  execute(bot, receivedMessage, args) {
    if (args.length < 2)
      return receivedMessage.channel.send("Error: Not enough arguments. Try ~gannounce **(Title)** **Message**");
    
    let channelIds = ["451749053911269378", "885389694551085116", "883652496076206110"];
    let tempArgs = [];
    let count = 0;
    for (id of channelIds) {
      tempArgs = args.slice(0);
      tempArgs.unshift(id);
      bot.commands.get('announce').execute(bot, receivedMessage, tempArgs);
    }
  }
}