const Discord = require("discord.js") 
const client = new Discord.Client() 
const config = require('./config.json')


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
           
