const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
    to: 'ahanda205@gmail.com',
    from: 'ahanda206@hotmail.com', // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

sgMail.send(msg);