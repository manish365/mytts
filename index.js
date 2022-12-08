var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var sessions = require('express-session');
var logger = require('morgan');
var auth = require('./helpers/jwt.js');
var errors = require('./helpers/errorHandler.js');
var indexRouter = require('./routes/index');
var browserRoute = require('./routes/broser');
var mp3Route = require('./routes/mp3');
var loginRouter = require('./routes/login');
var storiesRoute = require('./routes/stories');
var usersRouter = require('./routes/users');
var videosRouter = require('./routes/videos');
var newsFeedRoute = require('./routes/newsFeed');
var app = express();
const oneWeek = 1000 * 60 * 60 * 24 * 7;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessions({
  secret: "thisismyttssecrctekey",
  saveUninitialized: true,
  cookie: { maxAge: oneWeek },
  resave: true
}));
app.use('/mp3', mp3Route);
app.use('/stories', storiesRoute);
app.use('/login', loginRouter);
app.use('/', auth.authenticateToken, indexRouter);
app.use('/news-feed', auth.authenticateToken, newsFeedRoute);
app.use('/browserapi', auth.authenticateToken, browserRoute);

app.use('/users', auth.authenticateToken, usersRouter);
app.use('/videos', auth.authenticateToken, videosRouter);
app.use(errors.errorHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
