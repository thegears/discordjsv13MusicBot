const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "çal",
	command: new SlashCommandBuilder().setName("çal").setDescription("Bir müzik çal.").addStringOption(o => o.setName("name").setDescription("Müzik ismi.").setRequired(true)),
	async run(client, int, player, embed) {

		let name = int.options.getString("name");

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		try {
			if (!queue.connection) await queue.connect(int.member.voice.channel);
		} catch {
			queue.destroy();
			return await int.reply({
				embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Bulunduğun kanala katılamıyorum!")],
				ephemeral: true
			});
		};

		let emb = embed(int.guild, int.member.user);

		let track = await player.search(name, {
			requestedBy: int.user
		}).then(x => x.tracks[0]);
		if (!track) emb = emb.setDescription(`**${name}** Bu isimde bir şarkı bulamadım!`);
		else emb = emb.setTitle("➕ Şarkı Eklendi ➕").addField("İsim", `${track.title}`, true).addField("Yayınlayan", `${track.author}`, true).addField("İzlenme", `${track.views}`, true).setImage(`${track.thumbnail}`);

		queue.play(track);

		return await int.reply({
			embeds: [emb]
		});

	}
};