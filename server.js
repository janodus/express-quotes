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
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//==================================//
//========== ROUTES HERE ===========//
//==================================//

app.get('/', function(req,res) {
  console.log('reached /');

  //getting data from the database here:
  var cursor = db.collection('quotes').find( { name : "Janodus" }).toArray(function(err, results) {
    if(err) {console.log(err)}
    console.log(results);
    res.render('index.ejs', {quotes: results})
  });

  //res.sendFile(__dirname + '/index.html')
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
