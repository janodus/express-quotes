console.log("Server.js is running");
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

var db;

//mongodb initiatlization
MongoClient.connect('mongodb://janodus:shenmue1@ds229771.mlab.com:29771/quoteproject', function( err, client){
  if (err) {console.log(err)}
  db = client.db('quoteproject');

  app.listen(3000, function(req, res){
    console.log('App is running on 3000.');
  })
})

//list of middleware use functions here:
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function(req,res) {
  //res.send("<h1>GET request from home found!</h1>");
  res.sendFile(__dirname + '/index.html')
});

app.post('/quotes', function(req, res){
  console.log("Request info: " + req.body.name);

  for (var x in req.body) {
    console.log("'" +x+ "': " + req.body[x]);
  }

  db.collection('quotes').save(req.body, function(err, results) {
    if (err) {return console.log(err)}

    console.log("DATA SAVED TO DB!");
  });

  res.redirect('/');
  console.log("Sent to / to prevent request hanging");
  //res.redirect('/about');
});

app.get('/about', function(req, res){
    res.send("We've made it to the /about page!");
});
