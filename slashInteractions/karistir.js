const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "karıştır",
	command: new SlashCommandBuilder().setName("karıştır").setDescription("Sırayı karıştırır."),
	async run(client, int, player, embed) {
		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		queue.shuffle();

		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle("Sırayı karıştırdım!").setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJNnpHRsuaSJfLiovYqgMSbOyuputBCB6Vkw&usqp=CAU")]
		});
	}
};