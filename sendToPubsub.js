const app = require('./app');

app.use('/enviar-emails', context => {
  const { PubSub } = require('@google-cloud/pubsub');
  const pubsub = new PubSub();
  const topic = 'sendEmailToUserTopic';
  const publisher = pubsub.topic(topic).publisher();
  const promises = context.body.users
    .map(user => {
      const jsonUser = JSON.stringify(user);
      const bufferedData = Buffer.from(jsonUser);
      return publisher.publish(bufferedData);
    });

  await Promise.all(promises);
  return `Dados enviados para o tópico: ${topic}!`;
});
