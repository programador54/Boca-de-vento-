const Discord = require("discord.js") 
const client = new Discord.Client() 
const config = require('./config.json')
client.prefix = config.prefix;

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix)) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on("message", async (message) => {
  const member = message.member;
  switch (message.content.toLowerCase()) {
    case prefix + "ub all":
      if (member.hasPermission("ADMINISTRATOR")) {
        const users = await message.guild.fetchBans();
        for (const user of users.array()) {
          await message.guild.unban(user);
        }
        message.reply("Unbanned all users from the server.");
      } else
        message.reply("You do not have enough permissions for this command!");
    }
});

client.on('message', (message) => { //whenever a message is sent

  if (message.content.includes('Dianna')) { //if it contains an invite link

    message.react("737870780095791195") //delete the message
  }
});

client.on('message', (message) => { //whenever a message is sent

  if (message.content.includes('dianna')) { //if it contains an invite link

    message.react("737870780095791195") //delete the message
  }
});


client.on("ready", () => {
  let activities = [
      `Em desenvolvimento!`,
      `Criador Linux ON!`,
      `Segurança a todos!`,
      `Paz mundial!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 1000 * 60); 
  client.user
      .setStatus("dnd")
      .catch(console.error);
console.log("Estou Online!")
});

client.login(config.token)
           
