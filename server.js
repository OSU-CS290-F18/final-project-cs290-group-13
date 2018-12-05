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

/*---------------------------------------- */
app.get('/', function (req, res, next) {
  var projectCollection = mongoDB.collection('projects');
  projectCollection.find().sort({ button: 1, button10: 1 });
  projectCollection.find({}).sort({button:1, button10: 1}).toArray(function (err, projectDocs) {
    if(err) {
      res.status(500).send("Error Connecting to Db.");
    }
   res.status(200).render('homePage', {
     projects: projectDocs
   });
  });
});
/*---------------------------------------- */

/*---------------------------------------- */
app.get('/:post', function(req, res, next) {
  console.log(req.params.post)
  var post = req.params.post.toLowerCase();
  var postCollection = mongoDB.collection('post');
  postCollection.find({codeId: post}).toArray(function (err, postDocs) {
    if(err) {
        res.status(500).send("Error Connecting to Db.");
    } else if (postDocs.length > 0) {
        res.status(200).render('postPage', postDocs[0]);
    } else {
        next();
    }
  });
});
/*---------------------------------------- */



/*---------------------------------------- */
app.post('/addnewproject', function (req, res, next) {
    console.log("NEW PROJECT ADD POST")
    if (req.body && req.body.title && req.body.posts && req.body.button && req.body.button10) {
        var projectCollection = mongoDB.collection('projects');
        projectCollection.insertOne(
            { title: req.body.title,  posts: req.body.posts, button: req.body.button, button10: req.body.button10},
            function (err, result) {
                if (err) {
                    res.status(500).send("Error creating project");
                    console.log("Error PROJECT")
                } else if (result.matchedCount > 0) {
                    res.status(200).send("Success");
                    console.log("Gud PROJECT")
                } else {
                    next();
                }
            }
        );
        projectCollection.find().sort({ button: 1, button10: 1 });
        console.log("FINISH ADD PROJECT");
    } else {
        res.status(400).send("Request needs a valid project object");
    }

});

app.post('/addPost', function (req, res, next) {
  console.log("Test: req.body.project: ", req.body.project, " req.body.codeName: ", req.body.title, " req.body.codeLink: ", req.body.link, " req.body.code: ", req.body.imgURL );

  if (req.body && req.body.project && req.body.title && req.body.imgURL && req.body.link) {
      console.log("APP.POST IF OF ADD POST");
      var projectCollection = mongoDB.collection('projects');
      var postCollection = mongoDB.collection('post');


      console.log("Test: req.body.project: ", req.body.project, " req.body.codeName: ", req.body.title, " req.body.codeLink: ", req.body.link, " req.body.code: ", req.body.imgURL );
      projectCollection.updateOne(
          { title: req.body.project },
          { $push: { posts: { title: req.body.title, link: req.body.link, imgURL: req.body.imgURL } } },
          function (err, result) {
              if (err) {
                  res.status(500);
                  console.log("Error")
              } else if (result.matchedCount > 0) {
                  res.status(200);
                  console.log("Gud")
              } else {
                  next();
              }
          }
      );

      console.log("FINISH UPDATEONE");

      postCollection.insertOne(
          { codeId: req.body.link.toLowerCase(), title: req.body.project, name: req.body.title, url: req.body.imgURL },
          function (err, result) {
              if (err) {
                  res.status(500);
                  console.log("Error")
              } else if (result.matchedCount > 0) {
                  if(res.status === 200) {
                     res.status(200);
                  }
              } else {
                  next();
              }
          }
      );
      console.log("FINISH INSERTONE");
      if(res.status === 200) {
          res.status(200).send("Success");
      } else {
          res.status(200).send("Unspecified Error");
      }

  } else {
      res.status(400).send("Request needs a body with a URL and caption");
  }
});

/*---------------------------------------- */


app.get("*", function (req, res, next) {
  res.status(404).render('404');
});
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
