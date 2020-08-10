module.exports = {
  name: "slowmode",
  category: "utility",
  description: "Set the slowmode for the channel!",
  run: async (bot, message, args) => {
if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(`<a:alertA:727101012174962838> | <@${message.author.id}>. Você precisa ter a permissão de **GERENCIAR_MENSSAGENS** para poder utilizar este comando.`).then(msg => msg.delete({timeout: 5000}));
 
    if (!args[0])
      return message.channel.send(
        `Você não especificou o tempo em segundos que deseja definir o modo lento deste canal!`
      );
    if (isNaN(args[0])) return message.channel.send(`Isso não é um número!`);
    let reason = message.content.slice(
      bot.prefix.length + 9 + args[0].length + 1
    );
    if (!reason) {
      reason == "Nenhuma razão fornecida!";
    }
    message.channel.setRateLimitPerUser(args[0], reason);
    message.channel.send(
      `O Cooldown deste canal foi ativo **${args[0]}** por **${reason}**`
    );
  },
};
