const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "kapat",
	command: new SlashCommandBuilder().setName("kapat").setDescription("Sırayı siler ve sesten çıkar."),
	async run(client, int, player, embed) {

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		queue.destroy(true);

		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle("Sırayı sildim ve sesten çıktım!").setThumbnail("https://rukminim2.flixcart.com/image/416/416/kbb49zk0/poster/8/k/x/large-exit-sign-poster-rit-86-original-imafszfjghvms6n6.jpeg?q=70")]
		});
	}
};