const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "kaldır",
	command: new SlashCommandBuilder().setName("kaldır").setDescription("Sıradan şarkı kaldırın.").addIntegerOption(o => o.setName("number").setDescription("Sayı").setRequired(true)),
	async run(client, int, player, embed) {

		let number = int.options.getInteger("number");

		if (isNaN(number)) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Bir sayı girin!")],
			ephemeral: true
		});


		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		if (number > queue.tracks.length || number <= 0) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Girdiğiniz sayıda bir şarkı yok!")],
			ephemeral: true
		});


		let removedTrack = queue.tracks[number - 1];
		queue.remove(removedTrack);

		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setDescription(`**${removedTrack.title}** adlı şarkı sıradan kaldırıldı!`)]
		});

	}
};