const Discord = require(`discord.js`);
module.exports = {
	name: 'rps',
	description: 'Plays s game of rock, paper, scissors with the user. The user must send their choice as an argument. The bot will randomly pick one weapon and send results. Maybe keeps track of overall stats with each user.',
	execute(receivedMessage, args) {
		const weapons = ["rock", "paper", "scissors"];
		if (args.length === 0)
			return receivedMessage.channel.send("Error: No arguments. Try ~rps help.");
		if (args[0] === "help") {
			const helpMsg = new Discord.MessageEmbed();
			helpMsg.setTitle("**__Rock Paper Scissors__**")
			helpMsg.setColor("#00ff15");
			helpMsg.setDescription("To play, type **~rps [weapon]** \n *Rock smashes Scissors* \n *Scissors cut Paper* \n *Paper covers Rock*");
			receivedMessage.channel.send(helpMsg);
		} else if (weapons.includes(args[0])) {
			if (receivedMessage.author.id === "299714507876335617")
				return trollManthis();
			let chosenWeap = weapons[Math.floor(Math.random() * weapons.length)];
			if (chosenWeap === args[0])
				return receivedMessage.channel.send(`${receivedMessage.author}, We both picked ${chosenWeap}. It's a tie!`);
			if ((chosenWeap === "rock" && args[0] === "paper") || (chosenWeap === "scissors" && args[0] === "rock") || (chosenWeap === "paper" && args[0] === "scissors"))
				return receivedMessage.channel.send(`${receivedMessage.author}, I picked ${chosenWeap}, so you win!`);
			else return receivedMessage.channel.send(`${receivedMessage.author}, I picked ${chosenWeap}, so you lose!`);
		} else receivedMessage.channel.send("Error: Argument not recognized. Try ~rps help.");

		function trollManthis() {
			if (args[0] === "rock")
				return receivedMessage.channel.send(`${receivedMessage.author}, I picked paper, so you lose!`);
			if (args[0] === "paper")
				return receivedMessage.channel.send(`${receivedMessage.author}, I picked scissors, so you lose!`);
			if (args[0] === "scissors")
				return receivedMessage.channel.send(`${receivedMessage.author}, I picked rock, so you lose!`);
		}
	}
}