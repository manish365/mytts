var express = require('express');
var router = express.Router();

/* GET browser home page. */
router.get('/', function (req, res, next) {
 const isloggedIn = true;
 res.render('browser', { title: 'My tts', isloggedIn });
});
module.exports = router;
