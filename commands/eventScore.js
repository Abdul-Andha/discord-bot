module.exports = {
	name: 'eventScoreBoard',
	description: 'A command with sub commands, all used to manage the event score board. Sub commands include adding points, subtracting points, updating the scoreboard message. It will use google sheets to track peopl and their score. It will store discord name, discord @, and the persons score. The scoreboard will not @ anyone.',
	// args = [weekly/monthly, subCommand, @user, points]
	// for update args = [weekly/monthly, subCommand]
	execute(receivedMessage, args, weeklyScoreSheet, monthlyScoreSheet) {
		let sheet;
		if (args[0].toLowerCase() === "w") {
			sheet = weeklyScoreSheet;
		} else if (args[0].toLowerCase() === "m") {
			sheet = monthlyScoreSheet;
		}

		if (args[1] === "add" || args[1] === "a")
			addScore(receivedMessage, args, sheet);
		else if (args[1] === "sub" || args[1] === "s")
			subScore(receivedMessage, args, sheet);
		else if (args[1] === "update" || args[1] === "u")
			updateScoreboard(receivedMessage, sheet);
		else {
			receivedMessage.channel.send("Error: Argument not recognized. Please review the documentation. '~help sb'");
		}
	}
}

//add functions

async function addScore(receivedMessage, args, sheet) {
	let user = receivedMessage.mentions.users.first();
	let scoreToAdd = parseInt(args[3]);
	targetRow = await findRow(user.id, sheet);
	if (targetRow.length === 0) {
		addNewUser(user, scoreToAdd, sheet);
		receivedMessage.react('✅')
			// .then(receivedMessage.react('✅'))
			// .catch(receivedMessage.react('❌'));
	} else {
		targetRow[0].Score = parseInt(targetRow[0].Score) + scoreToAdd;
		await targetRow[0].save();
		return receivedMessage.react('✅');
	}
}

function addNewUser(user, score, sheet) {
	let row = {
		User: user.username,
		ID: user.id,
		Score: score
	};
	sheet.addRow(row);
}

//subtract functions

async function subScore(receivedMessage, args, sheet) {
	let user = receivedMessage.mentions.users.first();
	let scoreToSub = parseInt(args[3]);
	targetRow = await findRow(user.id, sheet);
	if (targetRow.length === 0) {
		receivedMessage.react('❌');
		return receivedMessage.channel.send("Error: User not found.");
	}
	if (parseInt(targetRow[0].Score) <= scoreToSub)
		targetRow[0].delete();
	else {
		targetRow[0].Score = parseInt(targetRow[0].Score) - scoreToSub;
		await targetRow[0].save();
	}
	receivedMessage.react('✅');
}

//update functions

function updateScoreboard(receivedMessage, sheet) {
	receivedMessage.channel.send("Coming soon!");
}

//helper functions

async function findRow(arg, sheet) {
	let targetRows = [];
	let rows = await sheet.getRows();
	await sheet.loadCells(`A2:C${rows.length + 1}`);       //change for different size sheets
	for (let i = 1; i < rows.length + 1; i++)
			for (let j = 0; j < 3; j++)
					if (arg === sheet.getCell(i, j).value.toString())
							if (!targetRows.includes(rows[i - 1]))
									targetRows.push(rows[i - 1]);
	return targetRows;
}