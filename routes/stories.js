var express = require('express');
var router = express.Router();
var storiesController = require('./../Controllers/StoriesController')
/* GET News feed page. */
router.get("/", storiesController.viewStories, function (req, res) { });
router.get('/add', function (req, res, next) {
 const isloggedIn = true;
 const list = [{ name: 'Stories', link: '/stories' }, { name: 'Add Stories', link: '' }];
 res.render('storiesadd', { title: 'My tts', isloggedIn: isloggedIn, list: list });
});
router.post("/add", storiesController.createStories, function (req, res) { });
router.get("/edit/:id/:feedtype", storiesController.editStories, function (req, res) { });
router.post("/update/:id", storiesController.updateStories, function (req, res) { });
router.post("/status/update", storiesController.updateStatus, function (req, res) { });
router.post("/delete", storiesController.deleteStory, function (req, res) { });
module.exports = router;
