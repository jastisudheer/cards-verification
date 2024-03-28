const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.replace(/^Bearer\s+/, ""), process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  } 
};
