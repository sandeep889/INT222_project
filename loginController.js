var User = require('../models/user');

//첫 login 페이지
var loginGet = function(req, res){
  res.render('login');
}

var loginPost = function(req, res){
   var uname = req.body.username;
    var pwd = req.body.password;

  User.findOne({ username: uname }, function(err, scott) {   //Find the same id value in db.
    if (scott===null) { return res.send(`<script>alert("Please check your id");  history.back();</script>` );}
    var rightpassword=scott.password;      // If you do not have the id entered in the db, a warning window
    if(rightpassword=== pwd){   //If there is an id, find pw in db.
      req.session.displayName = scott.displayName;
    return req.session.save(function(){  //If there is pwd in db, save session and save global variable for each table
       global.sessionid = scott.username;
       global.sessionpwd = scott.password;
      global.sessionnick = scott.displayName;
       res.redirect('main');}); //If id pwd is confirmed, go to main
    }else{
        res.send(`<script>alert("Please check password");  history.back();</script>`);
    } // If there is no pwd, create a warning window

  });
};

module.exports = {
  loginPost: loginPost,
  loginGet: loginGet
};
