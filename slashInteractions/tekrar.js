const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "tekrar",
	command: new SlashCommandBuilder().setName("tekrar").setDescription("Sırayı tekrarlama modununu açar/kapatır."),
	async run(client, int, player, embed) {
		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		let text;

		if(queue.repeatMode) {
			text = "Tekrarlama modunu kapattım!";
			queue.setRepeatMode(0);
		}
		else {
			text = "Tekrarlama modunu açtım!";
			queue.setRepeatMode(2);
		};

		

		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle(`${text}`).setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpUQquonuPTFmpnDQMMWl4rm8npwTyeHgcA&usqp=CAU")]
		});
	}
};