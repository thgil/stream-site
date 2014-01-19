
/*
 * GET home page.
 */

exports.index = function(req, res){

  var room =  (Math.random() + 1).toString(36).substring(2,7);
  res.redirect('/'+ room);
};

exports.room = function(req, res) {

  var room = req.params.room;
  res.render('index', {room: room});
};

exports.webrtc = function(req, res) {
  res.render('webrtc');
};

exports.screencapture = function(req, res) {
  res.render('screencapture');
};