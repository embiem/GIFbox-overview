// server.js
// where your node app starts

// init project
var firebase = require('firebase');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var Promise = require('promise');
var escape = require('escape-html');
var express = require('express');
var app = express();

// Configure the email transport using the default SMTP transport and a GMail account.
// See: https://nodemailer.com/
// For other types of transports (Amazon SES, Sendgrid...) see https://nodemailer.com/2-0-0-beta/setup-transporter/
var mailTransport = nodemailer.createTransport('smtps://'+process.env.GMAIL_USERNAME+'%40gmail.com:'+process.env.GMAIL_PASSWORD+'@smtp.gmail.com');

// [START initialize]
// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: 'https://'+process.env.PROJECT_ID+'.firebaseio.com',
  serviceAccount: {
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  }
});
// [END initialize]

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('front/build'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/front/build/index.html');
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
