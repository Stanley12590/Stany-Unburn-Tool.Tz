const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to send email
app.post('/send-unburn', async (req, res) => {
  const {name, phone, pressure, burnType} = req.body;
  if(!name || !phone || !pressure || !burnType){
    return res.json({success:false, message:"Missing fields"});
  }

  let body = "";
  if(burnType === "Temporary"){
    body = `Hello WhatsApp Support,\n\nMy name is ${name} and my account (${phone}) has been temporarily banned unfairly. Users exploit modded apps like GB WhatsApp to create fake chats, mass-report, and manipulate review links, punishing innocent users while offenders act freely.\n\nPressure Level: ${pressure}\n\nI demand urgent review and immediate restoration of my account.\n\nRegards,\n${name}`;
  } else if(burnType === "Permanent"){
    body = `Hello WhatsApp Support,\n\nMy name is ${name} and my account (${phone}) has been permanently banned unjustly. Modded apps are used to fabricate messages, send fake reports, and manipulate review links, causing permanent bans on innocent accounts.\n\nPressure Level: ${
