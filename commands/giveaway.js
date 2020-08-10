const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "giveaway",
  description: "Create a simple giveaway",
  usage: "<time> <channel> <prize>",
  category: "fun",
  run: async (bot, message, args) => {
if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(`<a:alertA:727101012174962838> | <@${message.author.id}>. Você precisa ter a permissão de **GERENCIAR_MENSSAGENS** para poder utilizar este comando.`).then(msg => msg.delete({timeout: 5000}));
 
    if (!args[0]) return message.channel.send(`Você não especificou seu tempo!`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `Você não usou a formatação correta para o tempo!`
      );
    if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `Eu não consegui encontrar esse canal no servidor!`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`Nenhum prêmio especificado!`);
    message.channel.send(`*Sorteio criado em ${channel}*`);
    let Embed = new MessageEmbed()
      .setTitle(`Novo sorteio!`)
      .setDescription(
        `O usuário ${message.author} iniciou um sorteio que tem como prêmio **${prize}**`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`BLUE`);
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `Não há pessoas suficientes reagindo para eu começar a escolher um vencedor!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `O vencedor do sorteio que tem como prêmio **${prize}** é o usuário ... ${winner}`
      );
    }, ms(args[0]));
  },
};
