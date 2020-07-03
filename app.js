var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const Feed = require('rss-to-json');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const webData = require("./model/webData")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//============view engine setup=======
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


let url = 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml';

function getFeed(){
  Feed.load(url, function(err, rss){
    var feed = rss.items;
    rssFeed = feed.map(function(feeds){
      console.log(feeds.title);
      console.log(feeds.description);
      console.log(feeds.link);
      //console.log(feeds.pubDate);    
    })
  });
 
}

let data = new Promise(function(resolve, reject ){
  resolve(getFeed());
});

 
app.get('/webfeeds', function(req, res){
  res.render( 'index', { title: "Chemnitz Web Feed", nyt_feed: nyt});

})


//========Set up moogoose connection=============

var mongoDB = 'mongodb://127.0.0.1/myapp';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useNewUrlParser: true});

var db = mongoose.connection;

db.on('connected', function () {
  console.log('Mongoose connected to ' + mongoDB);
});

db.on('error', (error) => {
  console.log('Mongoose connection error ' + error);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
