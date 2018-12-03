var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();


/*---------------------------------------- */
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
/*---------------------------------------- */



var projectData = require("./projectData");
var postData = require("./postData");


/*---------------------------------------- */
var mongoHost = process.env.MONGO_HOST || 'classmongo.engr.oregonstate.edu';
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME || 'cs290_leey3';
var mongoPassword = process.env.MONGO_PASSWORD || 'cs290_leey3';
var mongoDBName = process.env.MONGO_DB_NAME || 'cs290_leey3';

var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

var mongoDB = null;
/*---------------------------------------- */




var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

/*---------------------------------------- */
app.use(bodyParser.json());
/*---------------------------------------- */


app.get('/profile', function (req, res, next) {
  res.status(200).render('profilePage');
});


/*
app.get('/', function (req, res, next) {
  var context = {
      "projects": projectData
  }
  res.status(200).render('homePage', context);
});
*/
/*---------------------------------------- */
app.get('/', function (req, res, next) {
  var projectCollection = mongoDB.collection('projects');
  projectCollection.find({}).toArray(function (err, projectDocs) {
    if(err) {
      res.status(500).send("Error Connecting to Db.");
    }
    /*
    var context = {
      "proejects": projectDocs
    }
    res.status(200).render('homePage', context);
    */
   res.status(200).render('homePage', {
     projects: projectDocs
   });
  });
});
/*---------------------------------------- */


/*
app.get('/:post', function(req, res, next){
  var post = req.params.post.toLowerCase();
  if(postData[post]){
    res.render('postPage', postData[post]);
  }
  else{
    next();
  }
});
*/
/*---------------------------------------- */
app.get('/:post', function(req, res, next) {
  var post = req.params.post.toLowerCase();
  var postCollection = mongoDB.collection('post');
  postCollection.find({codeId: post}).toArray(function (err, postDocs) {
    if(err) {
      res.status(500).send("Error Connecting to Db.");
    } else if (postDocs.length > 0)
    {
      res.status(200).render('postPage', postDocs[0]);
    } else {
      next();
    }
  });
});
/*---------------------------------------- */



/*---------------------------------------- */
app.post('/addPost', function (req, res, next) {

  if (req.body && req.body.project && req.body.codeName && req.body.code && req.body.codeLink) {
    console.log("APP.POST IF OF ADD POST");
    var projectCollection = mongoDB.collection('projects');
    var postCollection = mongoDB.collection('post');
    projectCollection.updateOne(
      { title: project },
      { $push: { posts: { codetitle: req.body.codeName, link: req.body.codeLink, imgURL: req.body.code } } },
      function (err, result) {
        if (err) {
          res.status(500).send("Error saving photo to DB");
        } else if (result.matchedCount > 0) {
          res.status(200).send("Success");
        } else {
          next();
        }
      }
    );
    console.log("FINISH UPDATEONE");
    postCollection.insertOne(
      { codeId: req.body.link, title: req.body.project, name: req.body.codeName, url: req.body.code },
      function (err, result) {
        if (err) {
          res.status(500).send("Error saving photo to DB");
        } else if (result.matchedCount > 0) {
          res.status(200).send("Success");
        } else {
          next();
        }
      }
    );
    console.log("FINISH INSERTONE");
  } else {
    res.status(400).send("Request needs a body with a URL and caption");
  }
});


app.post('/addProject', function (req, res, next) {


  var projects = document.querySelector(".main-page");
  //Button..? work..? or not..?
  var button = projects.children.length - 1;
  var button10 = button +10;
  console.log("APP.POST IF OF ADDPROJECT", button, button10);
  if (req.body && req.body.project && req.body.button ) {
    var projectCollection = mongoDB.collection('projects');
    projectCollection.insertOne(
      { title: project,
      posts: [], button: button, button10: button},
      function (err, result) {
        if (err) {
          res.status(500).send("Error saving photo to DB");
        } else if (result.matchedCount > 0) {
          res.status(200).send("Success");
        } else {
          next();
        }
      }
    );
    console.log("FINISH INSERTONE OF PROJECT");
  } else {
    res.status(400).send("Request needs a body with a URL and caption");
  }
});
/*---------------------------------------- */








app.get("*", function (req, res, next) {
  res.status(404).render('404');
});


/*
app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port 3000");
});
*/
/*---------------------------------------- */
MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  mongoDB = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
/*---------------------------------------- */
