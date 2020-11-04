var express =require('express');
var app = express();
var session = require('express-session');
var bodyParser =require('body-parser');
var ejs = require('ejs');
var mongoose    = require('mongoose');
const MongoStore = require('connect-mongo')(session);
var multer = require('multer');


module.exports = function(app){

  //body Parser Middleware
  app.use(bodyParser.urlencoded({ extended: false }))
  //session Middleware
  app.use(session({
    secret: 'eifiofjw1234',
    resave: false,
    saveUninitialized: true,
    store:new MongoStore({ mongooseConnection: mongoose.connection })
  }));
  //uploadCity run
  app.use('/upload', express.static('uploads'));
  //ejs Middleware
  app.set('views', './views');
  app.set('view engine', 'ejs');

}
