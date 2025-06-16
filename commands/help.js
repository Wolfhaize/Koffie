const {SlashCommandBuilder} = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
    .setName ('koffie-help')
    .setDescription ('Get list of Koffie commands'),
async execute(interaction) {

const title = `**Koffie Commands**`
const support = ' https://discord.gg/pwgH5bKhv4'
const logchannel = '1107316070232109218';

    // Send message to log channel with user's name and ID
    const runner = interaction.user.username;
    const logMessage = `User ${runner} (${interaction.user.id}) used help`;
    const channel = interaction.client.channels.cache.get(logchannel);
    if (channel) {
      channel.send(logMessage);
    } else {
      console.error('Invalid log channel ID!');
    }

    // Update usage count in userdata.json file
    const dataFile = './logs/userdata.json';
    let data = {};
    if (fs.existsSync(dataFile)) {
      const rawData = fs.readFileSync(dataFile);
      data = JSON.parse(rawData);
    }
    const commandName = 'help';
    data[commandName] = (data[commandName] || 0) + 1;
    fs.writeFileSync(dataFile, JSON.stringify(data));

const embed = new EmbedBuilder()
.setColor(0xd29573)
.setTitle(title)
.setThumbnail('https://cdn.discordapp.com/avatars/1006680670480891965/52758b950932b7bfc46fc0849cecf8eb.png')
.setURL(support)
.setTimestamp()
.addFields([
    { 
        name: 'Coffee', 
        value: `Give a coffee to someone`
},

{ 
    name: 'Highfive', 
    value: `Give someone a highfive`
},

{ 
    name: 'Hug', 
    value: `Give someone a hug`
},

{ 
    name: 'Pat', 
    value: `Pat someone`
},


{ 
    name: 'Quote', 
    value: `Get a motivational quote`
},

{ 
    name: 'Smile', 
    value: `Send someone a smile`
},

{ 
    name: 'Wave', 
    value: `Wave at someone`
},

{ 
    name: 'Koffie-vote', 
    value: `Support Koffie by voting for the bot`
}
])
.setFooter({
    text: `Visit our support server in case of any bugs/suggestions!`,
  });
  
    
   


     
await interaction.deferReply();
await interaction.editReply({ embeds: [embed] });
}


}