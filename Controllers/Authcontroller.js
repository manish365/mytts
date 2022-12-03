const authServices = require('../services/AuthServices.js');
const bcrypt = require('bcryptjs');

async function authenticate(req, res) {
  const { userNameField, passwordField } = req.body;
  if (userNameField != '' && passwordField != '') {
    authServices.login({ username: userNameField, password: passwordField }).then(user => {
      if (user) {
        req.session.authorization = 'bearer ' + user['token'];
        res.redirect('/');
      } else {
        returnStatus(res, req.body.userNameField, req.body.passwordField);
      }
    }).catch(err => {
      returnStatus(res, req.body.userNameField, req.body.passwordField);
    });
  } else {
    returnStatus(res, '', '');
  }
}

function returnStatus(res, username, password) {
  res.render('login', {
    title: 'Login',
    username: username,
    password: password,
    error_message: "Invalid login credentials! Please provide valid username and password."
  });
}

async function register(req, res) {
  authServices.register({ username: 'manishwedsanjali', password: bcrypt.hashSync('Man@Anj', 8), email: 'manish.mailbox94@gmail.com' }).then(user => {
    res.json(user)
  }).catch(err => {
    res.send('op')
  });
}
async function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
}
module.exports = {
  authenticate,
  register,
  logout
};
