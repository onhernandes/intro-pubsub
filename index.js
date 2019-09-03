const SparkPost = require('sparkpost');
const spark = new SparkPost('key');

const getEventData = (event) => {
  const eventData = _.get(event, 'data');

  if (eventData === undefined) {
    return {};
  }

  let message = eventData.data ? Buffer.from(eventData.data, 'base64').toString() : eventData;

  if (!message) {
    return {};
  }

  if (typeof message === 'string') {
    const originalMessage = message;

    try {
      message = JSON.parse(message);
    } catch (e) {
      message = originalMessage;
    }
  }

  return message;
}

exports.sendEmailToUser = async (event) => {
  const data = getEventData(event);
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
