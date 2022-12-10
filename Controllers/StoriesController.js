const api_helper = require('../helpers/API_helper');
const storiesServices = require('../services/StoriesServices.js');
var xml2js = require('xml2js');
var feedlist = require('../config/feedlink');

function generateBreadcrumb(feedid = '') {
  const result = [];
  if (feedid == '' || feedid == 'timesofindia') {
    result.push({ name: 'News Feed', link: '/news-feed' })
  } else {
    result.push({ name: 'Stories', link: '/stories/' + feedid })
  }
  result.push({ name: feedid, link: '' });
  return result;
}
async function viewStories(req, res) {
  const isloggedIn = true;
  const params = req.params;
  const list = generateBreadcrumb(params.storytype);
  storiesServices.getAll({ category: params.storytype }).then(data => {
    res.render('stories', { title: 'My tts', isloggedIn: isloggedIn, list: list, data: data, feedid: params.storytype });
  }).catch(err => {
    res.render('stories', { title: 'My tts', isloggedIn: isloggedIn, list: list, errorMessage: 'Not able to find Please refresh', data: null, feedid: params.storytype });
  });
}
async function viewFeedList(req, res) {
  const isloggedIn = true;
  const params = req.params;
  const list = [{ name: 'News Feed', link: '/news-feed' }, { name: params.feedid, link: '' }];
  const feed = feedlist.data;
  storiesServices.getAll({ category: params.feedid }).then(data => {
    res.render('newsfeedlist', { title: 'My tts', isloggedIn: isloggedIn, list: list, data: data, feedid: params.feedid, url: feed[params.url]['rssfeedlink'] });
  }).catch(err => {
    res.render('newsfeedlist', { title: 'My tts', isloggedIn: isloggedIn, list: list, errorMessage: 'Not able to find Please refresh', data: null, feedid: params.feedid });
  });
}
async function editStories(req, res) {
  const isloggedIn = true;
  const params = req.params;
  var list = generateBreadcrumb(params.feedtype);
  storiesServices.getStory({ _id: params.id }).then(data => {
    res.render('storiesedit', { title: 'My tts', isloggedIn: isloggedIn, list: list, data: data });
  }).catch(err => {
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
async function parsexmlandcreate(response, params) {
  var parser = new xml2js.Parser();
  parser.parseString(response, function (err, result) {
    if (result && result['rss'] && result['rss']['channel'] && result['rss']['channel'][0]['item']) {
      const item = result['rss']['channel'][0]['item'];
      item.map((data) => {
        console.log('data')
        console.log(data)
        var description = '';
        if (data?.summary_text) {
          description = data.summary_text;
        } else if (data?.description) {
          description = data.description[0];
        }
        var headline = '';
        if (data?.title) {
          headline = data.title[0];
        }
        var slug = '';
        if (data?.link) {
          slug = data.link[0];
        } else if (data?.guid) {
          slug = data.guid[0];
        }
        storiesServices.create({ heading: headline, slug: slug, category: params.feedid, description: description }).then(data2 => {
        }).catch(err => {
          console.log(err)
        });
      })
    }
    return { data: result['rss']['channel'][0], status: 'success' }
  });
}
function jsoncreate(response, params) {
  if (response['data'] && response['data']['records']) {
    const item = response['data']['records'];
    item.map((data) => {
      var description = '';
      if (data?.summary_text) {
        description = data.summary_text;
      } else if (data?.description) {
        description = data.description;
      }
      var headline = '';
      if (data?.headline1) {
        headline = data.headline1;
      } else if (data?.title) {
        headline = data.title;
      }
      var slug = '';
      if (data?.guid) {
        slug = data.guid;
      } else if (data?.slug) {
        slug = data.slug;
      }
      storiesServices.create({ heading: headline, slug: slug, category: params.feedid, description: description }).then(data2 => {
      }).catch(err => {
        console.log(err)
      });
    });
  }
}
async function fetchFeedList(req, res) {
  const params = req.params;
  const body = req.body;
  api_helper.make_API_call(body.url)
    .then(async response => {
      console.log(response)
      if (typeof response == 'object') {
        const result = await jsoncreate(response, params);
        return res.json(result);
      } else {
        const result = await parsexmlandcreate(response, params);
        return res.json(result);
      }
    })
    .catch(error => {
      res.send(error)
    })
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
