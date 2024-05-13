// send-whatsapp-message.js
const twilio = require('twilio');

const accountSid = 'your_account_sid';  // Replace with your Twilio account SID
const authToken = 'your_auth_token';    // Replace with your Twilio Auth Token
const client = new twilio(accountSid, authToken);

client.messages.create({
  to: 'whatsapp:+1234567890',    // Replace with recipient's number including the international prefix
  from: 'whatsapp:+14155238886', // Replace with your Twilio number
  body: 'Hello, this is a message sent from Twilio WhatsApp API!'
})
.then(message => console.log(`Message sent! Message SID: ${message.sid}`))
.catch(error => console.error(error));
