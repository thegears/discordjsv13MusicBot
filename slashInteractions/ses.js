const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "ses",
	command: new SlashCommandBuilder().setName("ses").setDescription("Ses ayarlar.").addIntegerOption(o => o.setName("value").setDescription("Değer").setRequired(true)),
	async run(client, int, player, embed) {

		let value = int.options.getInteger("value");

		if (isNaN(value)) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Lütfen sayı girin!")]
		});

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		queue.setVolume(value);

		await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle(`Ses ${value} olarak ayarlandı!`).setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5mKjOY5FPlDgrffJo-tiuxtQVazWol8ipA&usqp=CAU")]
		});
	}
};