const express = require('express');
const router = express.Router();

const ContactController = require('../controllers/contacts');

router.post('/', ContactController.contact);

module.exports = router;
