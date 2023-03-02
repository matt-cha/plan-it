module.exports = function sendInvite() {
  const accountSid = 'AC16c88cb51171dd7a4b08dcd9c237ad3b';
  const authToken = '8e916127cf5d4df8001d339cda26933b';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: 'http://localhost:3000/events/2 an invite to the event',
      from: '+18446990230',
      to: '+18184387010'
    })
    // eslint-disable-next-line no-console
    .then(message => console.log('message has been sent'))
    .catch(err => console.error(err));
};

/* const accountSid = 'AC16c88cb51171dd7a4b08dcd9c237ad3b';
const authToken = 'db03231e6747102179aa53b800bcf065';
const client = require('twilio')(accountSid, authToken);

module.exports = function sendInvite(phoneNumber) {
  client.messages
    .create({
      body: 'http://localhost:3000/events/2 an invite to the event',
      from: '+18446990230',
      to: '+1' + '8184387010'
    })
    // eslint-disable-next-line no-console
    .then(message => console.log('message has been sent'))
    .catch(err => console.error(err));
};
 */
