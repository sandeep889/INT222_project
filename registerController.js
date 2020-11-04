var User = require('../models/user');
var session = require('express-session');

var registerGet = function(req, res){
  res.render('register');
}


var registerPost = function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var displayName = req.body.displayName;
  new User({username: username, password: password, displayName: displayName, uploadfile: null}).save(function(err, doc){
     if(doc) //Code that checks whether data is entered correctly
     {
       global.sessionid = username;
       global.sessionpwd = password; //->Save the entered data in db and convert each information into a global variable
       global.sessionnick = displayName
       console.log(doc)  //Create console window information when signing up
     }
  })
//After user registration and membership registration
//users.push(user);
req.session.displayName = req.body.displayName;
req.session.save(function(){    //remember req.session.s
  res.redirect('/main');
});
};

module.exports = {
  registerGet: registerGet,
  registerPost: registerPost

};
