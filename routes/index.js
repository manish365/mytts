var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const isloggedIn = true;
  res.render('index', { title: 'My tts', isloggedIn: isloggedIn });
});
module.exports = router;
