const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signUp = async (req, res, next) => {
  const existingUser = await User.find({ email: req.body.email }).exec();
  if (existingUser.length) {
    return res.status(409).json({
      message: 'Mail exists'
    });
  }
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phone: req.body.phone
    });
    try {
      const result = await user.save();
      const { __v, password, ...savedUser } = result._doc;
      return res.status(201).json({
        ...savedUser,
        token: jwt.sign(
          { email: savedUser.email, userId: savedUser._id },
          process.env.JWT_KEY,
          {}
        )
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

exports.signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Auth fail', email: req.body.email });
    }
    bcrypt.compare(req.body.password, user.password, (error, response) => {
      if (error || !response) {
        return res
          .status(401)
          .json({ message: 'Auth fail', email: req.body.email });
      }
      const { password, admin, __v, ...foundUser } = user._doc;
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.JWT_KEY,
        {}
      );
      return res
        .status(200)
        .json({ message: 'Auth successful', user: { ...foundUser, token } });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.remove({ _id: req.params.userId }).exec();
    return res.status(200).json({
      message: `Deleted user: ${req.params.userId}`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Patch User

exports.patchUser = async (req, res, next) => {
  try {
    const user = await User.update({ _id: req.params.id }, {...req.body}).exec();
    return res.status(200).json({
      message: `Patched user: ${req.params.userid}`,
      user: req.body
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
