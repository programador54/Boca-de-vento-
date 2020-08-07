const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "server-info",
    category: "extra",
    run: async (client, message, args) => {
        let region;
        switch (message.guild.region) {
            case "europe":
                region = '🇪🇺 Europe';
                break;
                case "brazil":
                region = '🇧🇷 Brasil';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#FF00FF')
            .setTitle(`${message.guild.name} server stats`)
            .addFields(
                {
                    name: "Dono: ",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "Membros: ",
                    value: `Há ${message.guild.memberCount} usuários!`,
                    inline: true
                },
                {
                    name: "Membros On-line: ",
                    value: `Há ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} usuários online!`,
                    inline: true
                },
                {
                    name: "Total Bots: ",
                    value: `Há ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                    inline: true
                },
                {
                    name: "Data de criação: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "Total de Cargos: ",
                    value: `Há ${message.guild.roles.cache.size} cargos neste servidor.`,
                    inline: true,
                },
                {
                    name: `🗺 Região: `,
                    value: region,
                    inline: true
                },
                {
                    name: `Verificação: `,
                    value: message.guild.verified ? 'Servidor é verificado' : `Servidor não é verificado`,
                    inline: true
                },
                {
                    name: 'Boosters: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `Há ${message.guild.premiumSubscriptionCount} Boosters!` : `Não há Boosters neste servidor!`,
                    inline: true
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `Há ${message.guild.emojis.cache.size} emojis!` : 'Não há emojis' ,
                    inline: true
                }
            )
        await message.channel.send(embed)
    }
}
