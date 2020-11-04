
var logout = function(req, res){
  delete req.session.displayName;  //->delete session
  global.sessionid = null;
  global.sessionpwd = null;   // ->  Saved global variables are also converted to null values
  global.sessionnick = null;
  req.session.save(function(){
    res.redirect('/');  //Go to start page
  });
};

module.exports = {
  logout: logout

};
