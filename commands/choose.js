module.exports = {
    name: 'choose',
    description: 'Chooses a random argument from those provided',
    execute(receivedMessage, args) {
        if (args.length < 2)
            return receivedMessage.channel.send("Error: Not enough arguments. Try /choose abc xyz");
        return receivedMessage.channel.send("Oh so you're indecisive and need my help. Ok I pick this one: " + args[Math.floor(Math.random() * args.length)]);
    }
}