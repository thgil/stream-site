
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index' );
};

exports.signed = function(req, res) {
  req.session.messages = [{type: 'alert-success', message: 'Sign up complete!'}];
  res.redirect('/');
};