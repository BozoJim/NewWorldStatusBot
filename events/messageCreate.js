const { MessageSelectMenu, Message } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	execute(message) {
        if (message.author.bot) return false;

        if ((message.channel.name === 'server-status' || message.channel.name === 'bot-test') && message.content.toLowerCase().includes('nwstatus')) {
            console.log(`responding to nwstatus request from ${message.author.username}`)
            let searchString = message.content.split(" ")[1]
            const serverStatus = require('../scripts/scrapePage')
            serverStatus.getData(searchString).then((result) => {
                message.reply(result)
            })
        }
	},
};
