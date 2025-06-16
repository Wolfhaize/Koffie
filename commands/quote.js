const {SlashCommandBuilder} = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
    .setName ('quote')
    .setDescription ('Get a motivational quote')
    
    .addStringOption ((option) => 
    option
      .setName('subject')
      .setDescription('The subject you want to get a quote about')
      .setRequired(false)
      .addChoices(
        { name: 'Anxiety', value: 'Anxiety' },
        { name: 'Change', value: 'Change' },
        { name: 'Choice', value: 'Choice' },
        { name: 'Confidence', value: 'Confidence' },
        { name: 'Death', value: 'Death' },
        { name: 'Dreams', value: 'Dreams' },
        { name: 'Excellence', value: 'Excellence' },
        { name: 'Failure', value: 'Failure' },
        { name: 'Fear', value: 'Fear' },
        { name: 'Forgiveness', value: 'Forgiveness' },
        { name: 'Freedom', value: 'Freedom' },
        { name: 'Future', value: 'Future' },
        { name: 'Happiness', value: 'Happiness' },
        { name: 'Inspiration', value: 'Inspiration' },
        { name: 'Kindness', value: 'Kindness' },
        { name: 'Leadership', value: 'Leadership' },
        { name: 'Life', value: 'Life' },
        { name: 'Love', value: 'Love' },
        { name: 'Pain', value: 'Pain' },
        { name: 'Past', value: 'Past' },
        { name: 'Success', value: 'Success' },
        { name: 'Time', value: 'Time' },
        { name: 'Today', value: 'Today' },
        { name: 'Truth', value: 'Truth' },
     
    )
    ),



    async execute(interaction) {
        const keyword = interaction.options.getString('subject');
    const motiquote = await request(`https://zenquotes.io/api/quotes/${keyword}`)??await request(`https://zenquotes.io/api/quotes/random`);
    const answer = await motiquote.body.json();
    const rrand = 'Random'
    const runner = interaction.user.username
    const title = `**Motivational Quote For ${runner} (${keyword??rrand})**`
    const support = ' https://discord.gg/pwgH5bKhv4'
    const logchannel = '1107316070232109218';

    // Send message to log channel with user's name and ID
    const logMessage = `User ${runner} (${interaction.user.id}) used quote`;
    const channel = interaction.client.channels.cache.get(logchannel);
    if (channel) {
      channel.send(logMessage);
    } else {
      console.error('Invalid log channel ID!');
    }

    // Update usage count in userdata.json file
    const dataFile = 'logs/userdata.json';
    let data = {};
    if (fs.existsSync(dataFile)) {
      const rawData = fs.readFileSync(dataFile);
      data = JSON.parse(rawData);
    }
    const commandName = 'quote';
    data[commandName] = (data[commandName] || 0) + 1;
    fs.writeFileSync(dataFile, JSON.stringify(data));

    const embed = new EmbedBuilder()
    .setColor(0xd29573)
    .setTitle(title)
    .setTimestamp()
    .setThumbnail('https://cdn.discordapp.com/avatars/1006680670480891965/52758b950932b7bfc46fc0849cecf8eb.png')
    .setURL(support)
    .setFooter({
        text: `Have a great day!`,
      })
    .addFields([
        { name: 'Quote', value: `${answer[0].q}` }, 
        { name: 'By', value: `${answer[0].a}` },
    ]);
        
       


         
    await interaction.deferReply();
    await interaction.editReply({ embeds: [embed] });
  }
}