const Stories = require('../models/StoriesModels.js');

async function getAll(filters = {}, sortBy = '') {
 const result = await Stories.find(filters);
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

module.exports = {
 getAll,
 create
};