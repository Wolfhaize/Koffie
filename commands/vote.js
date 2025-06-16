const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
    .setName ('koffie-vote')
    .setDescription ('Support Koffie by voting'),


    async execute (interaction) {
        const title = 'Vote  for Koffie'
        const support = ' https://discord.gg/pwgH5bKhv4'
        const logchannel = '1107316070232109218';

    // Send message to log channel with user's name and ID
    const logMessage = `User ${runner} (${interaction.user.id}) used vote`;
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
    const commandName = 'vote';
    data[commandName] = (data[commandName] || 0) + 1;
    fs.writeFileSync(dataFile, JSON.stringify(data));

        const embed = new EmbedBuilder()
    .setColor(0xd29573)
    .setTitle(title)
    .setTimestamp()
    .setThumbnail('https://cdn.discordapp.com/avatars/1006680670480891965/52758b950932b7bfc46fc0849cecf8eb.png')
    .setURL(support)
    .setDescription('Buy Me A Coffee: [Ko-fi](https://www.ko-fi.com/Wolfhaize)'
    )
    .addFields([
        {
            name:'Top.gg', value:'[Vote Here](https://top.gg/bot/1006680670480891965/vote)'
        },
        {
            name:'Discord Bot List', value:'[Vote Here](https://discordbotlist.com/bots/koffie/upvote)'
        }
    ])
    .setFooter({
        text: `Have a great day!`,
      });

      await interaction.reply({ embeds: [embed] });
    }
};