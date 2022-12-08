var express = require('express');
var router = express.Router();
var mp3Controller = require('./../Controllers/Mp3Controller')

router.post("/generate", mp3Controller.generateMp3, function (req, res) { });
module.exports = router;
