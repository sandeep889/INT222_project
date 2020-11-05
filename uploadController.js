//File upload
var User = require('../models/user');
var session = require('express-session');
var mongoose    = require('mongoose');
const MongoStore = require('connect-mongo')(session);
var multer = require('multer');

//////////////////////////////////////////////////////////////////////////////////////config
var _storage = multer.diskStorage({   //  //Setting for multi storage use
  destination: function (req, file, cb) { //Where to store user submitted files?
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {  //How do you name the file to be saved?
    cb(null, file.originalname);
    }
})
var upload = multer({ storage: _storage}) //Using mongoose and connect-mongo
//////////////////////////////////////////////////////////////////////////////////////config
var db = mongoose.connection;   //Settings for using db
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to db.");
});
mongoose.connect('mongodb://localhost/login');
///////////////////////////////////////////////////////////////////////////////////////config

var uploadGet = function(req, res){
  //전역변수인 회원 id(sessionid)를 통해 user db에 uploadfile(회원이 저장한 파일 명)을 보여줌
  User.findOne({ username: global.sessionid }, function(err, scott) {
    console.log(global.sessionid);
  res.render('upload',{sessionnick:scott.displayName, sessionfile:scott.uploadfile,name:null,destination:'uploads/', id:global.sessionid});
});
}

var uploadPost = function(req, res){ //Userfile in middleware req file is the form name of the upload directory
  if(req.file!=null){
  console.log(req.file); //Check through the uploaded file console
  db.collection('users').updateOne( //Modify uploadfile in user collection from null value to filename
  { username: global.sessionid }, //Search and modify db based on member id, which is a global variable
  { $set: { uploadfile: req.file.filename }, //req.file.filename -> Submitted file name ex) ID photo.jpg
  $currentDate: { lastModified: false } })
  .then(function(result) {
  });
  User.findOne({ username: global.sessionid }, function(err, scott) {
  res.render('upload',{ sessionnick:scott.displayName, sessionfile:scott.uploadfile, destination:req.file.destination, filename:req.file.filename, array:User.uploadfile, id:global.sessionid});
});  //Routing by upload post method
}else{ return res.send(`<script>alert("Please select a file");  history.back();</script>` );}
};

module.exports = {
  uploadPost: uploadPost,
  uploadGet: uploadGet,
  upload: upload
};
