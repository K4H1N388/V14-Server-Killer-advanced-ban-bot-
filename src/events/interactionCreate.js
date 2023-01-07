module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		const command = client.slashcommands.get(interaction.commandName);
		if (!command) return;
		try {
			command.execute(client, interaction);
		} catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was a problem with the command, please try again later 😔', ephemeral: true });
		}
	},
};
