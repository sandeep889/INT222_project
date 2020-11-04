var main = function(req, res){  //-> Main page where you can use functions after login
  if(req.session.displayName){  //If you have a session
      res.render('main',{sessionnick:req.session.displayName});  //Routing to main page and saving nickname variable
  } else{
   res.redirect('/'); //If you don't have a session, go to the start page
  }
};

module.exports = {
  main: main

};
