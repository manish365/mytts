var express = require('express');
var router = express.Router();

/* GET News feed page. */
router.get('/', function (req, res, next) {
 const isloggedIn = true;
 const list = ['news feed']
 res.render('newsfeed', { title: 'My tts', isloggedIn: isloggedIn, list: list });
});
module.exports = router;
