const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);
