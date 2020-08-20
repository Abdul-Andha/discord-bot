module.exports = {
    name: 'help',
    description: 'Gives a list of commands.',
    execute(receivedMessage) {
        return receivedMessage.channel.send("Here are all of the commands: dyg, choose, excuse, help");
    }
}