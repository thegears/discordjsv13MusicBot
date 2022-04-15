const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	ms2time
} = require("ms2time");

module.exports = {
	name: "sıra",
	command: new SlashCommandBuilder().setName("sıra").setDescription("Sırayı gösterir."),
	async run(client, int, player, embed) {

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		let queueText = "";

		if (queue.tracks.length == 0) queueText = "Sırada hiç şarkı yok! ";
		else
			for (let t of queue.tracks) {
				let i = queue.tracks.indexOf(t);

				queueText += `**${i +1 }.** ${t.title}\n`
			};


		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle(" Sıra ").setDescription(`${queueText}`).setFooter({
				text: `${ms2time(queue.totalTime,"tr")}`
			})]
		});

	}
};