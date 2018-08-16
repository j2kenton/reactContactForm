const express = require('express')
const app = express()

app.get('/', (req, res) => {
	 const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'jonathankenton@gmail.com',
    from: 'jonathankenton@gmail.com',
    subject: 'New Lead',
    text: 'First Name: '+req.query.firstName+', Last Name: '+req.query.lastName+', Email Address: '+req.query.email+', Phone Number: '+req.query.phoneNumber+'.',
    html: '<p>First Name: '+req.query.firstName+'</p><p>Last Name: '+req.query.lastName+'</p><p>Email Address: '+req.query.email+'</p><p>Phone Number: '+req.query.phoneNumber+'</p>'
  };
  
	try {
  sgMail.send(msg);
  			res.send("sent email #1");

	} catch (error) {
			res.send(error);

		throw error;
	}
  
	})

app.listen(3333, () => console.log('Example app listening on port 3333!'))