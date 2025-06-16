const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wave')
    .setDescription('Wave to someone')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user you want to wave at')
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const motiquote = await request(`https://kawaii.red/api/gif/wave/token=anonymous`);
    const answer = await motiquote.body.json();
    const runner = interaction.user.username;
    const receive = interaction.options.getUser('user');
    const receiver = receive.username;
    const support = 'https://discord.gg/pwgH5bKhv4';
    const logchannel = '1107316070232109218';

    // Send message to log channel with user's name and ID
    const logMessage = `User ${runner} (${interaction.user.id}) waved to ${receiver} (${receive.id})`;
    const channel = interaction.client.channels.cache.get(logchannel);
    if (channel) {
      channel.send(logMessage);
    } else {
      console.error('Invalid log channel ID!');
    }

    // Update usage count in userdata.json file
    const dataFile = '../logs/userdata.json';
    let data = {};
    if (fs.existsSync(dataFile)) {
      const rawData = fs.readFileSync(dataFile);
      data = JSON.parse(rawData);
    }
    const commandName = 'wave';
    data[commandName] = (data[commandName] || 0) + 1;
    fs.writeFileSync(dataFile, JSON.stringify(data));

    
    const title = `**${receiver ?? runner}, ${runner} is waving at you!**`;
    const embed = new EmbedBuilder()
      .setColor(0xd29573)
      .setTitle(title)
      .setThumbnail('https://cdn.discordapp.com/avatars/1006680670480891965/52758b950932b7bfc46fc0849cecf8eb.png')
      .setImage(answer.response)
      .setTimestamp()
      .setURL(support)
      .setFooter({
        text: `Hello there!`
      });

    
    await interaction.editReply({ embeds: [embed] });
  }
};