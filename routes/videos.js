var express = require('express');
var router = express.Router();
var audioconcat = require('audioconcat')
var videoController = require('./../Controllers/VideoController');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('videos', { title: 'My tts' });
});

router.get('/audio', function (req, res, next) {
  var songs = [
    'output.mp3',
    'output2.mp3',
  ]
  audioconcat(songs)
    .concat('all.mp3')
    .on('start', function (command) {
      console.log('ffmpeg process started:', command)
    })
    .on('error', function (err, stdout, stderr) {
      console.error('Error:', err)
      console.error('ffmpeg stderr:', stderr)
      res.render('videos', { title: 'My tts' });

    })
    .on('end', function (output) {
      console.error('Audio created in:', output)
      res.render('videos', { title: 'My tts' });

    })
});
router.post("/generate", videoController.generateVideo, function (req, res) { });
router.post("/trim", videoController.trimVideo, function (req, res) { });

module.exports = router;
