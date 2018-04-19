const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

router.post('/signup', UsersController.signUp);

router.post('/signin', UsersController.signIn);

// router.delete('/:userId', UsersController.deleteUser);


//Patch
router.patch('/:id', UsersController.patchUser);


module.exports = router;
