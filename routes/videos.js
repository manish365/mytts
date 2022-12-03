var express = require('express');
var router = express.Router();
var videoshow = require('videoshow')
var audioconcat = require('audioconcat')

/* GET home page. */
router.get('/', function (req, res, next) {
 const images = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Lord_Rama_with_arrows.jpg/1024px-Lord_Rama_with_arrows.jpg'
 ];
 var videoOptions = {
  fps: 25,
  loop: 22, // seconds
  transition: false,
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x?',
  aspect: '16:9',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p'
 }
 videoshow(images, videoOptions)
  .audio('output.mp3')
  .save('video.mp4')
  .on('start', function (command) {
   console.log(new Date())
   console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
   console.error('Error:', err)
   console.error('ffmpeg stderr:', stderr)
   res.render('videos', { title: 'My tts' });
  })
  .on('end', function (output) {
   console.log(new Date())
   console.error('Video created in:', output)
   res.render('videos', { title: 'My tts' });

  })
});

router.get('/audio', function (req, res, next) {
 var audioconcat = require('audioconcat')

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

module.exports = router;
