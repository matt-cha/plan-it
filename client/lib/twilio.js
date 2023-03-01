function sendInvite() {
  const accountSid = 'ACeccdf116c1b7f183b2a0738d55dfb2ab';
  const authToken = 'edd33f3ff2e9b954a24f4d583ed5ba36';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: 'http://localhost:3000/events/2 an invite to the event',
      from: '+18334421427',
      to: '+18184387010'
    })
    // eslint-disable-next-line no-console
    .then(message => console.log('message has been sent'))
    .catch(err => console.error(err));
}
sendInvite();
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
