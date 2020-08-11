const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "user-info",
    category: "extra",
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "<:Online:642306780788949022> Online";
                break;
            case "dnd":
                status = "<:DND:642306779354497034> Não perturbar";
                break;
            case "idle":
                status = "<:Idle:642306780231237642> Ausente";
                break;
            case "offline":
                status = "<:Offline:642306779539046410> Off-line/invisível";
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`<a:dc:742774710751985705> Informações do usuário ${user.user.tag}`)
            .setColor(`#8A2BE2`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addField('🔖 Nome do usuário:', `\`${user.user.tag}\``) 
            .addField('🆔 ID do Discord:', `\`${user.user.id}\``) 
            .addField('📶 Status atual: ', status, true) 
            .addField('🖼️ Avatar link:', `[Click aqui](${user.user.displayAvatarURL()})`) 
            .addField('📆 Data de criação: ', user.user.createdAt.toLocaleDateString("en-us"), true) 
            .addField('☀️ Entrou no servidor em:', user.joinedAt.toLocaleDateString("en-us"), true)
            .addField('💼 Cargos: ', user.roles.cache.map(role => `\`${role.name}\``).join(" ,"), true) 
              
             message.channel.send(embed)
    }
}
