const SparkPost = require('sparkpost');
const spark = new SparkPost('key');

exports.sendEmailToUser = async (event) => {
  let data = event.data ? Buffer.from(event.data, 'base64').toString() : '{}';
  data = JSON.parse(data);

  let payload = {
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
