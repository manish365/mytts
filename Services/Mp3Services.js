const Mp3 = require('../models/Mp3Models.js');

async function getAll(filters = {}, sortBy = '') {
 const result = await Mp3.find(filters);
 if (result) {
  return { data: [...result], status: 'success' }
 } else {
  return { data: null, status: 'failed' }
 }
}

async function create(params) {
 const mp3 = new Mp3(params)
 await mp3.save();
 return mp3;
}
async function createUdate(params) {
 const audio = await Mp3.findOne({ content_id: params.content_id });
 if (audio) {
  audio.content_name = params.content_name
  return await audio.save();
 } else {
  const mp3 = new Mp3(params);
  return await mp3.save();
 }
}

module.exports = {
 getAll,
 create,
 createUdate
};