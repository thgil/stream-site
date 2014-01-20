
exports.index = function(req, res) {

  var room =  (Math.random() + 1).toString(36).substring(2,7);
  res.redirect('/demo/'+ room);

};

exports.room = function(req, res) {

  var room = req.params.room;
  res.render('demo', {room: room});

};