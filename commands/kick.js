const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Kicks a member from the server",

    async run (client, msg, args) {

if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send("You don't have permission to kick members.");
        let toKick = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return msg.channel.send(`<a:errado:630163775122833419> | <@${message.author.id}>, Por favor, especifique um usuário\n\> **ex**: d-kick @user divulgação`);
        if(!toKick) return msg.channel.send(`${args[0]} is not a member.`);
        if(!reason) return msg.channel.send('Specify a reason.');
 
        if(!toKick.kickable){
            return msg.channel.send(':x: I cannot kick someone that is mod/admin. :x:');
        }
 
        if(toKick.kickable){
            let x = new Discord.MessageEmbed()
            .setTitle('Kick')
            .addField('Member Kicked', toKick)
            .addField('Kicked by', msg.author)
            .addField('Reason', reason)
            .addField('Date', msg.createdAt)
            .setColor("#995BBD");
 
            msg.channel.send(x);
            toKick.kick();
        }
    }
} 
