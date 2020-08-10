module.exports = {
  name: "slowmode",
  category: "utility",
  description: "Set the slowmode for the channel!",
  run: async (bot, message, args) => {
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
