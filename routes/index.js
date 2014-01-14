
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.webrtc = function(req, res) {
  res.render('webrtc');
};

exports.screencapture = function(req, res) {
  res.render('screencapture');
};