const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Kicks a member from the server",

    async run (client, message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`<a:alertA:727101012174962838> | <@${message.author.id}>, Você precisa ter a permissão de **BANIR_MEMBROS** para poder utilizar este comando.`).then(msg => msg.delete({timeout: 5000}))
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`<a:errado:630163775122833419> | <@${message.author.id}>, Eu não tenho a permissão certa.`).then(msg => msg.delete({timeout: 5000}))

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send(`<a:errado:630163775122833419> | <@${message.author.id}>, Por favor, especifique um usuário\n\> **ex**: d-ban @user flood no chat`).then(msg => msg.delete({timeout: 5000}));

        if(!member) return message.channel.send(`<a:errado:630163775122833419> | <@${message.author.id}>, Não consigo encontrar esse usuário. Desculpe :/`).then(msg => msg.delete({timeout: 5000}));
        if(!member.bannable) return message.channel.send(`<a:errado:630163775122833419> | <@${message.author.id}>, Este usuário não pode ser banido. É porque eles são um moderador/administrador, ou seu papel mais alto é maior do que o meu`).then(msg => msg.delete({timeout: 5000}));

        if(member.id === message.author.id) return message.channel.send(`<a:errado:630163775122833419> | <@${message.author.id}>, Ops , você não pode se banir.`).then(msg => msg.delete({timeout: 5000}));

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Não fornecido';

        member.ban(reason)
        .catch(err => {
            if(err) return message.channel.send('<a:errado:630163775122833419> | <@${message.author.id}>, Algo deu errado.').then(msg => msg.delete({timeout: 5000}));
        })

        const banembed = new Discord.MessageEmbed()
        .setTitle('Usuário Banido!')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Nome do usuário:', member)
        .addField('Autor da punição:', message.author)
        .addField('Motivação:', reason)
        .setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);


    }
}
