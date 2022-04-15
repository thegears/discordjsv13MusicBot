const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "filtre",
	command: new SlashCommandBuilder().setName("filtre").setDescription("Şarkı filtresi seçersiniz.").addStringOption(o => o.setRequired(true).setName("filter").setDescription("filtre").addChoice("Filtreleri temizle", "cleanFilters").addChoice("Bass Artır", "bassboost").addChoice("8D", "8D").addChoice("Vaporwave", "vaporwave").addChoice("Nightcore", "nightcore").addChoice("Reverse", "reverse")),
	async run(client, int, player, embed) {

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		let filter = int.options.getString("filter");
		let filters = {
			bassboost: false,
			"8D": false,
			vaporwave: false,
			nightcore: false,
			reverse: false
		};
		let enabledFilters = queue.getFiltersEnabled();
		let text;

		if (filter == "cleanFilters") {

			text = `Bütün filtreleri temizledim!`

			for (let f of enabledFilters) {
				filters[f] = false;
			};

		} else {

			text = `**${filter}** adlı filtreyi açtım!`;

			for (let f of enabledFilters) {
				filters[f] = true;
			};

			filters[filter] = true;

		};

		queue.setFilters(filters);


		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setDescription(`${text}`)]
		});

	}
};