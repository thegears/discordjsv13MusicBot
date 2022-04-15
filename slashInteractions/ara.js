const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	MessageActionRow,
	MessageButton,
} = require("discord.js");

module.exports = {
	name: "ara",
	command: new SlashCommandBuilder().setName("ara").setDescription("Şarkı ararsınız.").addStringOption(o => o.setName("name").setDescription("Şarkı ismi.").setRequired(true)),
	async run(client, int, player, embed) {

		let name = int.options.getString("name");

		let tracks = await player.search(name, {
			requestedBy: int.user
		}).then(x => x.tracks);
		tracks = tracks.filter(t => t.title.length < 50)
		tracks = tracks.slice(0, 5)

		let buttonList = [],
			tracksText = "";

		for (let t of tracks) {
			let i = tracks.indexOf(t);

			buttonList.push(new MessageButton()
				.setStyle("SUCCESS")
				.setLabel(`${i+1}`)
				.setCustomId(`add-music-${int.member.user.id}-${t.title}`));

			tracksText += `**${i+1}.** ${t.title}\n`;
		};

		let comps;

		if (tracks.length > 0) comps = [new MessageActionRow().addComponents(buttonList)];
		else {
			comps = [];
			tracksText = "Hiç şarkı bulamadım :("
		};

		await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle("Bulunan şarkılar").setDescription(`${tracksText}`).setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcvxpNGi-KiuvgF26UdfgrP7ErbgoE-CkR5g&usqp=CAU")],
			components: comps
		});

	}
};