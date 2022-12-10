var express = require('express');
var router = express.Router();
var storiesController = require('./../Controllers/StoriesController');
var feedlist = require('../config/feedlink');

/* GET News feed page. */
router.get('/', function (req, res, next) {
 const isloggedIn = true;
 const list = [{ name: 'News Feed', link: '/news-feed' }];
 const data = feedlist.data;
 res.render('newsfeed', { title: 'My tts', isloggedIn: isloggedIn, list: list, data: data });
});
router.get("/:feedid/:url", storiesController.viewFeedList, function (req, res) { });
router.post("/fetch/:feedid", storiesController.fetchFeedList, function (req, res) { });
module.exports = router;
