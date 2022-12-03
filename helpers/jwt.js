const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
function authenticateToken(req, res, next) {
 var authHeader = req.headers['authorization'];
 if (req.session.authorization) {
  authHeader = req.session.authorization;
 }
 const token = authHeader && authHeader.split(' ')[1];
 if (token == null) {
  return req.headers['api_call'] ? res.sendStatus(401) : res.redirect('/login');
 }
 jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  if (err) {
   return req.headers['api_call'] ? res.sendStatus(401) : res.redirect('/login');
  }
  req.user = user
  next()
 })
}
function generateAccessToken(username) {
 return jwt.sign({ data: username }, process.env.TOKEN_SECRET, { expiresIn: '12h' });
}

module.exports = {
 authenticateToken,
 generateAccessToken
}