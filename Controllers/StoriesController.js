const storiesServices = require('../services/StoriesServices.js');

async function viewStories(req, res) {
 const isloggedIn = true;
 const list = [{ name: 'Stories', link: '' }];
 storiesServices.getAll().then(data => {
  res.render('stories', { title: 'My tts', isloggedIn: isloggedIn, list: list, data: data });
 }).catch(err => {
  res.render('stories', { title: 'My tts', isloggedIn: isloggedIn, list: list, errorMessage: 'Not able to find Please refresh', data: null });
 });
}
async function createStories(req, res) {
 const body = req.body;
 storiesServices.create({ heading: body.heading, slug: body.slug, category: body.category, description: body.description }).then(data => {
  res.json({ data: data, status: 'success' })
 }).catch(err => {
  res.json({ data: null, status: 'failed', err: err })
 });
}


module.exports = {
 viewStories,
 createStories
};
