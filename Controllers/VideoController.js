var videoshow = require('videoshow');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)
const storiesServices = require('../services/StoriesServices.js');
var videoOptions = {
  fps: 25,
  transition: false,
  videoBitrate: 1024,
  videoCodec: 'libx264',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mov',
  pixelFormat: 'yuv420p'
}
const images = [];
async function generateVideo(req, res) {
  const body = req.body;
  if (body.videoType == 'shorts') {
    videoOptions.size = '270x480';
    videoOptions.aspect = '9:16';
    images.push('public/images/mytssmob.png')
  } else {
    videoOptions.aspect = '16:9';
    images.push('public/images/mytss.png')
  }
  videoOptions.loop = parseInt(body.duration);
  console.log(videoOptions.loop)
  storiesServices.getStory({ _id: body.id }).then(async data => {
    if (data && data.audio_url) {
      const slugarr = data.slug.split('/')
      const video_url = `videos/${slugarr[slugarr.length - 1]}.mov`;
      videoshow(images, videoOptions)
        .audio(`public/${data.audio_url}`)
        .save(`public/${video_url}`)
        .on('start', function (command) { })
        .on('error', function (err, stdout, stderr) {
          res.json({ data: null, status: 'failed', err: 'Failed to generate video' })
        })
        .on('end', function (output) {
          const up = { video_url: video_url };
          storiesServices.updateAudio({ _id: data.id }, up).then(async data3 => {
            res.json({ data: data3, status: 'success' })
          }).catch(err => {
            res.json({ data: null, status: 'failed', err: err })
          });
        })
    } else {
      res.json({ data: null, status: 'failed', err: 'No content found' })
    }
  }).catch(err => {
    res.json({ data: null, status: 'failed', err: err })
  });
}
async function trimVideo(req, res) {
  const body = req.body;
  const duration = parseInt(body.duration);
  storiesServices.getStory({ _id: body.id }).then(async data => {
    const slugarr = data.slug.split('/')
    const video_url = `videos/${slugarr[slugarr.length - 1]}.mp4`;
    if (data && data.video_url) {
      ffmpeg(`public/${data.video_url}`)
        .setStartTime('00:00:00')
        .setDuration(duration)
        .output(`public/${video_url}`)
        .on('end', function (err) {
          if (err) { return res.json({ data: null, status: 'failed3', err: err }) }
          const up = { video_url: video_url };
          storiesServices.updateAudio({ _id: data.id }, up).then(async data3 => {
            res.json({ data: data3, status: 'success' })
          }).catch(err => {
            res.json({ data: null, status: 'failed', err: err })
          });
        })
        .on('error', err => res.json({ data: null, status: 'failed2', err: err, }))
        .run();
    } else {
      res.json({ data: null, status: 'failed', err: 'No content found' })
    }
  }).catch(err => {
    res.json({ data: null, status: 'failed', err: err })
  });
}
module.exports = {
  generateVideo,
  trimVideo
};
