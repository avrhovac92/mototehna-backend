const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.get('Authorization'), process.env.JWT_KEY);
    req.userData = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed.' });
  }
};