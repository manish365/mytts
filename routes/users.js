var express = require('express');
var textToSpeech = require('@google-cloud/text-to-speech');
var fs = require('fs');
var util = require('util');
var router = express.Router();
require('dotenv').config();

async function quickStart(fn) {
  const client = new textToSpeech.TextToSpeechClient();
  const text = 'हमारे साथ श्री रघुनाथ तो किस बात की चिंता, शरण में रख दिया जब माथ तो किस बात की चिंता,शरण में रख दिया जब माथा तो किस बात की चिंता !, किया करते हो तुम दिन रात क्यों बिन बात की चिंता, किया करते हो तुम दिन रात क्यों बिन बात की चिंता !किया करते हो तुम दिन रात क्यों बिन बात की चिंता, तेरे स्वामी, तेरे स्वामी को रहती है, तेरे हर बात की चिंता, तेरे स्वामी को रहती है';
  const request = {
    input: { text: text },
    voice: { languageCode: 'hi-IN', ssmlGender: 'NEUTRAL', name: "hi-IN-Standard-A" },
    audioConfig: {
      audioEncoding: 'MP3',
      pitch: 0,
      speakingRate: 0.75
    },
  };
  try {
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output2.mp3', response.audioContent, 'binary');
    return fn('output.mp3');
  } catch (err) {
    console.log(err)
    return fn(null)
  }
}
/* GET users listing. */
router.get('/', function (req, res, next) {
  quickStart(function (data) {
    res.render('user', { title: 'My tts backend', data: data });
  })
});

module.exports = router;
