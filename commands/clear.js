const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(`<a:alertA:727101012174962838> | <@${message.author.id}>. Você precisa ter a permissão de **GERENCIAR_MENSSAGENS** para poder utilizar este comando.`).then(msg => msg.delete({timeout: 5000}));
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return message.channel.send(`<a:errado:630163775122833419> | <@${message.author.id}>, Forneça um número junto ao comando de até **99 mensagens** a serem excluídas!`).then(msg => msg.delete({timeout: 5000}));

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });
  message.channel.bulkDelete(fetched);
  message.channel
    .send(`**${args[0]} mensagens limpas nesse chat!**`).then(msg => msg.delete({timeout: 5000}))
    .catch(error =>
      console.log(`Não foi possível deletar mensagens devido a: ${error}`)
    );
};  
