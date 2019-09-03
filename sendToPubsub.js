const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

const users = [
  {
    nome: 'Seu Nome',
    email: 'seu@email.com',
    quantidadeVendas: 150
  }
];

(async () => {
  const topic = 'sendEmailToUserTopic';
  const publisher = pubsub.topic(topic).publisher();
  const promises = users
    .map(user => {
      const jsonUser = JSON.stringify(user);
      const bufferedData = Buffer.from(jsonUser);
      return publisher.publish(bufferedData);
    });

  await Promise.all(promises);
  console.log(`Dados enviados para o tópico: ${topic}!`);
})();
