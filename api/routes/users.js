const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

router.post('/signup', UsersController.signUp);

router.post('/signin', UsersController.signIn);

// router.delete('/:userId', UsersController.deleteUser);

module.exports = router;
