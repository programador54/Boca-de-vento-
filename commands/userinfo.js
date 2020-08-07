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
            .setTitle(`Informações sobre o ${user.user.username}`)
            .setColor(`#f3f3f3`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "Nome do usuário: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Discriminator: ",
                    value: `\`#${user.user.discriminator}\``,
                    inline: true
                },
                {
                    name: "🆔 ID do Discord: ",
                    value: `\`${user.user.id}\``,
                },
                {
                    name: "Status atual: ",
                    value: status,
                    inline: true
                },
                {
                    name: "Atividade: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                    inline: true
                },
                {
                    name: 'Avatar link: ',
                    value: `[Click Here](${user.user.displayAvatarURL()})`
                },
                {
                    name: 'Data de criação: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'Entrou no servidor em: ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'User Roles: ',
                    value: user.roles.cache.map(role => `\`${role.name}\``).join(" ,"),
                    inline: true
                }
            )

        await message.channel.send(embed)
    }
}
