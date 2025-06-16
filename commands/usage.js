const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('usage')
    .setDescription('Get the usage count for a command')
    .addStringOption(option =>
      option
        .setName('command')
        .setDescription('The name of the command you want to check')
        .setRequired(true)
        .addChoices(
            { name: 'Coffee', value: 'coffee' },
			{ name: 'Help', value: 'help' },
			{ name: 'Highfive', value: 'highfive' },
            { name: 'Hug', value: 'hug' },
			{ name: 'Pat', value: 'pat' },
			{ name: 'Quote', value: 'quote' },
            { name: 'Smile', value: 'smile' },
			{ name: 'Vote', value: 'vote' },
			{ name: 'Wave', value: 'wave' },
        )
    ),
  async execute(interaction) {
    // Array of allowed user IDs
    const allowedUserIDs = ['827112913755963402', '833374459926413382', '746681747722207303', '769193703339851786'];

    // Check if the user who used the command is in the allowed array of user IDs
    if (!allowedUserIDs.includes(interaction.user.id)) {
      return await interaction.reply('You are not authorized to use this command.');
    }

    // Retrieve command name and usage count from userdata.json file
    const commandName = interaction.options.getString('command').toLowerCase();
    const dataFile = './logs/userdata.json';
    let data = {};
    if (fs.existsSync(dataFile)) {
      const rawData = fs.readFileSync(dataFile);
      data = JSON.parse(rawData);
    }
    const usageCount = data[commandName] || 0;

    // Send reply with usage count
    await interaction.reply(`The \`${commandName}\` command has been used ${usageCount} time(s).`);
  }
};