const mongoose = require('mongoose');

const Contact = require('../models/contact');
const nodemailer = require('nodemailer');
const EmailBody = require('../config/email-body.js');

exports.contact = async (req, res, next) => {
  const contact = new Contact({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message
  });
  try {
    const result = await contact.save();
    const { __v, ...savedContact } = result._doc;
    const mailOptions = {
      from: '"Mototehna" <avrhovac92@gmail.com>',
      to: 'avrhovac92@gmail.com',
      subject: 'Kontakt Forma',
      html: EmailBody(
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.message
      )
    };
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vrhovacgames@gmail.com',
        pass: 'vrhovacgames92'
      }
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    return res.status(201).json(savedContact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
