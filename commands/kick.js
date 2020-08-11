const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Kicks a member from the server",

    async run (client, msg, args) {

if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send(`<a:alertA:727101012174962838> | <@${message.author.id}>, Você precisa ter a permissão de **EXPULSAR_MEMBROS** para poder utilizar este comando.`).then(msg => msg.delete({timeout: 15000}));
        let toKick = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return msg.channel.send(`<a:errado:630163775122833419> | <@${message.author.id}>, Por favor, especifique um usuário\n\> **ex**: d-kick @user divulgação`).then(msg => msg.delete({timeout: 15000}))
        if(!toKick) return msg.channel.send(`<a:errado:630163775122833419>| Isso **${args[0]}** não é um membro válido!`).then(msg => msg.delete({timeout: 15000}));
        if(!reason) return msg.channel.send(`<a:errado:630163775122833419> | <@${message.author.id}> Neste comando em específico é necessário que você informe o motivo do kick!`).then(msg => msg.delete({timeout: 15000}));
 
        if(!toKick.kickable){
            return msg.channel.send(`<a:errado:630163775122833419> | Eu não posso kick em alguém que é moderador/administrador!`).then(msg => msg.delete({timeout: 15000}));
        }
 
        if(toKick.kickable){
            let x = new Discord.MessageEmbed()
            .setTitle('Kick')
            .addField('Member Kicked', toKick)
            .addField('Kicked by', msg.author)
            .addField('Reason', reason)
            .addField('Date', msg.createdAt)
            .setColor("#8A2BE2");
 
            msg.channel.send(x);
            toKick.kick();
        }
    }
} 
