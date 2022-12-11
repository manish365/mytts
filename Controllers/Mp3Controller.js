var textToSpeech = require('@google-cloud/text-to-speech');
var fs = require('fs');
var util = require('util');
require('dotenv').config();
const mp3Services = require('../services/Mp3Services.js');
const storiesServices = require('../services/StoriesServices.js');
const request = {
 input: { text: '' },
 voice: { languageCode: 'hi-IN', ssmlGender: 'NEUTRAL', name: "hi-IN-Standard-A" },
 audioConfig: {
  audioEncoding: 'MP3',
  pitch: 0,
  speakingRate: 1.15
 },
};
const client = new textToSpeech.TextToSpeechClient();
async function viewMp3(req, res) {
 const isloggedIn = true;
 const list = [{ name: 'News Feed', link: '' }];
 storiesServices.getAll().then(data => {
  res.render('stories', { title: 'My tts', isloggedIn: isloggedIn, list: list, data: data });
 }).catch(err => {
  res.render('stories', { title: 'My tts', isloggedIn: isloggedIn, list: list, errorMessage: 'Not able to find Please refresh', data: null });
 });
}
async function generateMp3(req, res) {
 const body = req.body;
 storiesServices.getStory({ _id: body.id }).then(async data => {
  if (data) {
   const text = data.description;
   request.input = { text: text };
   try {
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    const slugarr = data.slug.split('/')
    const audio_url = `audios/${slugarr[slugarr.length - 1]}.mp3`;
    await writeFile(`public/${audio_url}`, response.audioContent, 'binary');
    mp3Services.createUdate({ content_id: data.id, content_name: data.heading, mp3_name: audio_url }).then(data2 => {
     const up = { audio_url: audio_url };
     storiesServices.updateAudio({ _id: data.id }, up).then(async data3 => {
      res.json({ data: data3, status: 'success' })
     }).catch(err => {
      res.json({ data: data2, status: 'failed', err: err })
     });
    }).catch(err => {
     res.json({ data: null, status: 'failed', err: err })
    });
   } catch (err) {
    res.json({ data: null, status: 'failed', err: err })
   }
  } else {
   res.json({ data: null, status: 'failed', err: 'No content found' })
  }
 }).catch(err => {
  res.json({ data: null, status: 'failed', err: err })
 });
}
module.exports = {
 viewMp3,
 generateMp3
};
