const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Kicks a member from the server",

    async run (client, message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('<a:alertA:727101012174962838> | <@${message.author.id}>. Você precisa ter a permissão de **BANIR_MEMBROS** para poder utilizar este comando.')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Eu não tenho a permissão certa.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Por favor, especifique um usuário');

        if(!member) return message.channel.send('Não consigo encontrar esse usuário. Desculpe :/');
        if(!member.bannable) return message.channel.send('Este usuário não pode ser banido. É porque eles são um moderador/administrador, ou seu papel mais alto é maior do que o meu');

        if(member.id === message.author.id) return message.channel.send('Bruh, você não pode se banir.!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Não fornecido';

        member.ban(reason)
        .catch(err => {
            if(err) return message.channel.send('Algo deu errado.')
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
