const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "atla",
	command: new SlashCommandBuilder().setName("atla").setDescription("Şarkının girdiğiniz kısmına atlar.").addStringOption(o => o.setName("time").setDescription("Zaman ( Örnek : 1:24 ) ").setRequired(true)),
	async run(client, int, player, embed) {

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		if (!queue.nowPlaying()) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setDescription("Şuanda çalan bir **şarkı** yok!")],
			ephemeral: true
		});

		let time = int.options.getString("time");
		let min = time.split(":")[0].split(" ")[time.split(":")[0].split(" ").length - 1];
		let sec = time.split(":")[1].split(" ")[0];
		let trackDuration = queue.nowPlaying().duration;

		if (!min || !sec || isNaN(min) || isNaN(sec)) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Örnek kullanım => '1:24'")],
			ephemeral: true
		});

		sec = parseInt(sec);
		min = parseInt(min);

		if (sec >= 60) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Saniye 60'tan küçük olmalı!")],
			ephemeral: true
		});

		if (min > parseInt(trackDuration.split(":")[0])) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle(`Şarkının uzunluğu => ${trackDuration}`)],
			ephemeral: true
		});

		if (min == parseInt(trackDuration.split(":")[0]) && sec > parseInt(trackDuration.split(":")[1])) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle(`Şarkının uzunluğu => ${trackDuration}`)],
			ephemeral: true
		});

		let t = 0;

		t += min * 60000;
		t += sec * 1000;

		queue.seek(t);

		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle(`Şarkının ${time} kısmına atladım!`)]
		});
	}
};