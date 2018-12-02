var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

var projectData = require("./projectData");
var postData = require("./postData");

var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.get('/profile', function (req, res, next) {
  res.status(200).render('profilePage');
});


app.get('/', function (req, res, next) {
  var context = {
      "projects": projectData
  }
  res.status(200).render('homePage', context);
});

app.get('/:post', function(req, res, next){
  var post = req.params.post.toLowerCase();
  if(postData[post]){
    res.render('postPage', postData[post]);
  }
  else{
    next();
  }
});

app.get("*", function (req, res, next) {
  res.status(404).render('404');
});


app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port 3000");
});
