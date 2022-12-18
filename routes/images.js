var express = require('express');
var router = express.Router();
var imageController = require('./../Controllers/ImageController');
/* GET home page. */
router.get('/', function (req, res, next) {
 const list = [];
 res.render('images', { title: 'My tts', list: list });
});

module.exports = router;
