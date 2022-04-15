const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "durdur",
	command: new SlashCommandBuilder().setName("durdur").setDescription("Şarkıyı durdurur."),
	async run(client, int, player, embed) {

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		queue.setPaused(true);

		await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle("Durduruldu!").setThumbnail("https://cdn2.iconfinder.com/data/icons/control-button/64/pause-resume-button-interface-512.png")]
		});
	}
};