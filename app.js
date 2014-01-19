
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session());


// Message middleware so we can do flash messages
app.use(function(req, res, next){
  var msgs = req.session.messages || [];

  // empty or "flush" the messages so they don't build up
  delete req.session.messages;

  res.locals({
    messages: msgs,
    hasMessages: !! msgs.length
  });

  next();
});

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/webrtc', routes.webrtc);
app.get('/screencapture', routes.screencapture);
app.get('/:room', routes.room);
app.get('/', routes.index);

app.use(function(err, req, res, next){
  // treat as 404
  if (~err.message.indexOf('not found')) return next();

  // log it
  console.error(err.stack);

  // error page
  res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404);//.render('404', { url: req.originalUrl });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
