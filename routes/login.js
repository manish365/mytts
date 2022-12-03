var express = require('express');
var router = express.Router();
const authController = require('../Controllers/Authcontroller.js')

/* GET home page. */
router.get('/', function (req, res, next) {
 req.session.destroy();
 res.render('login', { title: 'Login' });
});
router.post("/", authController.authenticate, function (req, res) { });
router.get("/logout", authController.logout, function (req, res) { });
router.get("/register", authController.register, function (req, res) { });

module.exports = router;
