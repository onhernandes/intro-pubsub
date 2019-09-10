
exports.sendEmailToUser = async (pubSubEvent, context) => {
  const stringifiedJson = Buffer.from(pubSubEvent.data, 'base64').toString();
  const message = JSON.parse(stringifiedJson);
  const SparkPost = require('sparkpost');
  const spark = new SparkPost('key');

  const payload = {
    content: {
      subject: 'Relatório de vendas',
      from: 'sua@empresa.com.br'
    },
    recipients: [ { address: data.email } ],
    html: `Ola ${data.nome}, essa semana tivemos um total de ${data.quantidadeVendas} vendas!`
  };

  const response = await spark.transmissions.send(payload);

  console.log('Email enviado!', response);
  return response;
};
