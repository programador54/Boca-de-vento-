const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute anyone who break rules",
  category: "moderation",
  usage: "mute <@mention> <reason>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Sorry but you do not have permission to mute anyone"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to manage roles.");
    }

    const user = message.mentions.members.first();
    
    if(!user) {
      return message.channel.send("Você não mencionou ninguém para eu mutar!").then(m => m.delete(15000))
    }
    
    if(user.id === message.author.id) {
      return message.channel.send("I won't mute you -_-");
    }
    
    
    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
      return message.channel.send("Não foi fornecido o motivo para punir o usuário mencionado!")
    }
    
  //TIME TO LET MUTED ROLE
    
    let muterole = message.guild.roles.cache.find(x => x.name === "Silenciado")
    
    
      if(!muterole) {
      return message.channel.send("Crie um cargo com o nome `Silenciado` para eu conseguir mutar os usuários!")
    }
    
    
   if(user.roles.cache.has(muterole)) {
      return message.channel.send("Usuário mencionado já está Mutado!")
    }
    
  
    
    
    user.roles.add(muterole)
    
await message.channel.send(`Usuário **${message.mentions.users.first().username}** foi Mutado por \`${reason}\``)
    
    user.send(`Você foi Mutado no servidor **${message.guild.name}** por \`${reason}\``)
    
    
//WE ARE DONE HERE 
    
  }
};
