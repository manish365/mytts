const api_helper = require('../helpers/API_helper');
const storiesServices = require('../services/StoriesServices.js');
var xml2js = require('xml2js');

async function viewStories(req, res) {
 const isloggedIn = true;
 const list = [{ name: 'Stories', link: '' }];
 storiesServices.getAll().then(data => {
  res.render('stories', { title: 'My tts', isloggedIn: isloggedIn, list: list, data: data });
 }).catch(err => {
  res.render('stories', { title: 'My tts', isloggedIn: isloggedIn, list: list, errorMessage: 'Not able to find Please refresh', data: null });
 });
}
async function viewFeedList(req, res) {
 const isloggedIn = true;
 const params = req.params;
 const list = [{ name: 'News Feed', link: '/news-feed' }, { name: params.feedid, link: '' }];
 storiesServices.getAll({ category: params.feedid }).then(data => {
  res.render('newsfeedlist', { title: 'My tts', isloggedIn: isloggedIn, list: list, data: data, feedid: params.feedid });
 }).catch(err => {
  res.render('newsfeedlist', { title: 'My tts', isloggedIn: isloggedIn, list: list, errorMessage: 'Not able to find Please refresh', data: null, feedid: params.feedid });
 });
}
function generateBreadcrumb(feedid = '', data = '') {
 return [{ name: 'News Feed', link: '/news-feed' }, { name: feedid, link: '' }];
}
async function editStories(req, res) {
 const isloggedIn = true;
 const params = req.params;
 storiesServices.getStory({ _id: params.id }).then(data => {
  var list = generateBreadcrumb(params.feedtype, data);
  res.render('storiesedit', { title: 'My tts', isloggedIn: isloggedIn, list: list, data: data });
 }).catch(err => {
  var list = generateBreadcrumb(params.feedtype);
  res.render('storiesedit', { title: 'My tts', isloggedIn: isloggedIn, list: list, errorMessage: 'Not able to find data', data: null });
 });
}
async function updateStories(req, res) {
 const body = req.body;
 const params = req.params;
 storiesServices.updateStory({ _id: params.id }, { heading: body.heading, slug: body.slug, category: body.category, description: body.description }).then(data => {
  res.json({ data: data, status: 'success' })
 }).catch(err => {
  res.json({ data: null, status: 'failed', err: err })
 });
}
async function updateStatus(req, res) {
 const body = req.body;
 storiesServices.updateStatus({ _id: body.id }, { status: body.status }).then(data => {
  res.json({ data: data, status: 'success' })
 }).catch(err => {
  res.json({ data: null, status: 'failed', err: err })
 });
}
async function deleteStory(req, res) {
 const body = req.body;
 storiesServices.deleteStory({ _id: body.id }).then(data => {
  res.json({ data: data, status: 'success' })
 }).catch(err => {
  res.json({ data: null, status: 'failed', err: err })
 });
}
async function fetchFeedList(req, res) {
 const params = req.params;
 const body = req.body;
 api_helper.make_API_call(body.url)
  .then(response => {
   var parser = new xml2js.Parser();
   parser.parseString(response, function (err, result) {
    if (result && result['rss'] && result['rss']['channel'] && result['rss']['channel'][0]['item']) {
     const item = result['rss']['channel'][0]['item'];
     console.log(item)
     item.map((data) => {
      console.log('data')
      console.log(data)
      storiesServices.create({ heading: data.title[0], slug: data.guid[0], category: params.feedid, description: data.description[0] }).then(data2 => {
       console.log(data2)
      }).catch(err => {
       console.log(err)
      });
     })
    }
    res.json({ data: result['rss']['channel'][0], status: 'success' });
   });
  })
  .catch(error => {
   res.send(error)
  })
 // storiesServices.getAll({ category: params.feedid }).then(data => {
 // }).catch(err => {
 // });
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
 createStories,
 viewFeedList,
 fetchFeedList,
 editStories,
 updateStories,
 updateStatus,
 deleteStory
};
