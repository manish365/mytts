var express = require('express');
var router = express.Router();
var storiesController = require('./../Controllers/StoriesController')

/* GET News feed page. */
router.get('/', function (req, res, next) {
 const isloggedIn = true;
 const list = [{ name: 'News Feed', link: '/news-feed' }, { name: 'Add Stories', link: '' }];
 res.render('newsfeed', { title: 'My tts', isloggedIn: isloggedIn, list: list });
});
router.get("/:feedid", storiesController.viewFeedList, function (req, res) { });
router.post("/fetch/:feedid", storiesController.fetchFeedList, function (req, res) { });
module.exports = router;
