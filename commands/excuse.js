module.exports = {
    name: 'excuse',
    description: 'Returns a response to an excuse from args',
    execute(receivedMessage, args) {
        if (args.length === 0)
            return receivedMessage.channel.send("Error: No Argument");
        else if (args.length > 1)
            return receivedMessage.channel.send("Error: Too many arguments. Looking for **1** argument.");
        else if (args[0] === "<@152207704545296384>" || args[0] === "Thunder" || args[0] === "thunder")
            return receivedMessage.channel.send("Thunder doesn't make excuses often. You should listen to him.")
        let excuseResponses = ["I don't wanna hear it!", "Blah, blah, blah. Always with the excuses.", "We haven't played in so long", "Are you sure you're not just afraid to lose?"]
        receivedMessage.channel.send("Hmm, another excuse from " + args[0] + ". Try responding with: " + excuseResponses[Math.floor(Math.random() * excuseResponses.length)]);
    }
}