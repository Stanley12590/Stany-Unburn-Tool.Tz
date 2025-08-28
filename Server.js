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
    body = `Hello WhatsApp Support,\n\nMy name is ${name} and my account (${phone}) has been permanently banned unjustly. Modded apps are used to fabricate messages, send fake reports, and manipulate review links, causing permanent bans on innocent accounts.\n\nPressure Level: ${pressure}\n\nThis action is illegal and unacceptable. I demand urgent investigation and full restoration of my account immediately.\n\nRegards,\n${name}`;
  } else if(burnType === "Restricted"){
    body = `Important Complaint:\n\nMy name is ${name} and my account (${phone}) is restricted unfairly. Users send harmless messages like "Hi" and then falsely report them with fabricated chats. Review links are manipulated to enforce permanent bans on innocent accounts.\n\nPressure Level: ${pressure}\n\nI demand urgent review and full account reactivation immediately.\n\nRegards,\n${name}`;
  }

  try{
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"STANY UNBURN TOOL" <${process.env.SMTP_USER}>`,
      to: "support@whatsapp.com",
      subject: `Urgent Complaint – ${burnType} Ban (${pressure})`,
      text: body
    });

    res.json({success:true});
  } catch(err){
    console.error(err);
    res.json({success:false});
  }
});

app.listen(process.env.PORT || 3000, ()=>console.log("Server running..."));
