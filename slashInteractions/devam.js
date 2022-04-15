const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "devam",
	command: new SlashCommandBuilder().setName("devam").setDescription("Şarkıya devam ettirir."),
	async run(client, int, player, embed) {

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		queue.setPaused(false);

		await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle("Devam ediyor!").setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtfiF5MbtzvGFNBBQsSXDdsYW4noepo2NU7E4K8mm4rOApY-EVQqnZ8TqYLhGPalh5Nb4&usqp=CAU")]
		});
	}
};