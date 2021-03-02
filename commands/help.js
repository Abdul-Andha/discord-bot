const Discord = require(`discord.js`);

module.exports = {
	name: 'help',
	description: 'Gives a list of commands if there are no arguments. Gives specific instructions of a command depending on the argument',
	execute(receivedMessage, args) {
		if (args.length == 0)
			receivedMessage.channel.send("__What command do you need help with?__ \n > Announce \n > Message \n \n *Do ~help command*");
		else if (args[0].toLowerCase() == "announce")
			sendAnnounceHelp(receivedMessage);
		else if (args[0].toLowerCase() == "message")
			receivedMessage.channel.send("Message help is on the way!");
	}
}

function sendAnnounceHelp(receivedMessage) {
	const outputMessage = new Discord.MessageEmbed();
	outputMessage.setColor("#3381ff");
	outputMessage.setTitle("**__Announce Command Guide__**");

	let body = "The following is a guide on the ~announce command. You can also do ~a or ~Announce for this command.";
	body += "\n You must use the following notation: **~announce #channel-name (Title) Message**";
	body += "\n";
	body += "\n__Channel__";
	body += "\nYou must use #channel-name format. **This command is only to be used for announcement and news channels.**";
	body += "\n";
	body += "\n__Title__";
	body += "\nYou must put a title for your announcement. You must only use parentheses for titles that are more than one word.";
	body += "\n";
	body += "\n__Message__";
	body += "\nThe message is the actual announcement. Start on the same line as the command but go to the next line when you want your message to go to the next line.";
	body += "\n All text will have no decorations. You can add your own, if you wish.";
	body += "\n";
	body += "\n__Image__";
	body += "\nIf you want to include an image in your announcement, simply attach it with the message."; 
	body += "\nOnly works with one image. Support for multiple images may be added in the future.";
	body += "\n";
	body += "\n__Test before send__";
	body += "\n**The test will not @everyone.** Test your announcement before sending it. To test it, put a 't' before the command.";
	body += "\nYou can use the test feature of the command in **any non public channel.**";
	body += "\nEx: ~tannounce #channel-name (test announcement) Hello World!";
	body += "\n";
	body += "\nDM Thunder#6228 if you have any questions.";
	outputMessage.setDescription(body);
	outputMessage.setImage("https://media.discordapp.net/attachments/737378578370527273/816128022855548958/announcetest.png?width=1005&height=676");

	receivedMessage.channel.send(outputMessage);
}