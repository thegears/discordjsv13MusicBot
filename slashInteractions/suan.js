const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "şuan",
	command: new SlashCommandBuilder().setName("şuan").setDescription("Şuanda çalan şarkının bilgilerini verir.."),
	async run(client, int, player, embed) {

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		let emb;

		let track = queue.nowPlaying();
		if (track) emb = embed(queue.guild, track.requestedBy).setTitle("🎶 Çalıyor 🎶").setFooter({
			text: `${queue.createProgressBar()}`
		}).addField("İsim", `${track.title}`, true).addField("Yayınlayan", `${track.author}`, true).addField("İzlenme", `${track.views}`, true).setImage(`${track.thumbnail}`);
		else emb = embed(queue.guild, track.requestedBy).setDescription("Şuanda çalan bir **şarkı** yok!");


		return await int.reply({
			embeds: [emb]
		});

	}
};