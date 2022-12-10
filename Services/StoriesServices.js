const Stories = require('../models/StoriesModels.js');

async function getAll(filters = {}, sortBy = '') {
 const result = await Stories.find({ ...filters, is_deleated: 0 });
 if (result) {
  return { data: [...result], status: 'success' }
 } else {
  return { data: null, status: 'failed' }
 }
}
async function create(params) {
 const stories = new Stories(params)
 await stories.save();
 return stories;
}
async function getStory(id) {
 const stories = await Stories.findById(id);
 return stories.toJSON();
}
async function updateStory(id, up) {
 const stories = await Stories.findById(id);
 stories.heading = up.heading;
 stories.slug = up.slug;
 stories.category = up.category;
 if (up.description) {
  var description = up.description.replaceAll('<p>', '')
  description = description.replaceAll('</p>', '')
  stories.description = description;
 }
 return stories.save();
}
async function updateAudio(id, up) {
 const stories = await Stories.findById(id);
 stories.audio_url = up.audio_url;
 return stories.save();
}
async function updateStatus(id, up) {
 const stories = await Stories.findById(id);
 stories.status = up.status;
 return stories.save();
}
async function deleteStory(id) {
 const stories = await Stories.findByIdAndDelete(id);
 // stories.is_deleated = 1;
 // console.log(stories);
 // return stories.save();
 return stories.toJSON()
}

module.exports = {
 getAll,
 create,
 getStory,
 updateStory,
 updateStatus,
 deleteStory,
 updateAudio
};