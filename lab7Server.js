/**Todo
 * 1. Route signIn and Register buttons to login/register pages
 * 2. Stay signed in
 * 3. Display name on page
 * 
 */

// REQUIRES
const express = require('express');
const lists = require('./public/scripts/data');

// https://www.npmjs.com/package/jsdom
const {
  JSDOM
} = require('jsdom');
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// STATIC DIRECTORIES
app.use(express.static("public"));
app.use('/scripts', express.static('./public/scripts'));


app.get('/', function (req, res) {

  let doc = fs.readFileSync('./public/lab7.html', "utf8");
  res.send(doc);

});

//Get spaceships call
app.get('/ajax-GET-spaceships', function (req, res) {
  let formatOfResponse = req.query['format'];
  let dataList = null;

  if (formatOfResponse == 'html-list') {

    res.setHeader('Content-Type', 'text/html');
    dataList = lists.getSpaceships();
    res.send(dataList);

  } else if (formatOfResponse == 'json') {

    res.setHeader('Content-Type', 'application/json');
    datalist = lists.getJSON();
    res.send(dataList);

  } else {
    res.send({
      msg: 'wrong format!'
    });
  }
});

////////////JSON SPACESHIP TABLE
app.get('/ajax-GET-spaceships2', function (req, res) {
  let formatOfResponse = req.query['format'];
  let dataList = null;

  if (formatOfResponse == 'html-list') {

    res.setHeader('Content-Type', 'text/html');
    dataList = lists.getNASA();
    res.send(dataList);

  } else if (formatOfResponse == 'json') {

    res.setHeader('Content-Type', 'application/json');
    dataList = lists.getNASA(); ///Changed here
    res.send(dataList);

  } else {
    res.send({
      msg: 'wrong format!'
    });
  }
});

//GET JSON Spaceship
app.get('/ajax-GET-spaceshipJSON', function (req, res) {
  let formatOfResponse = req.query['format'];
  let spaceshipJSON = null;

  if (formatOfResponse == 'json') {

    res.setHeader('Content-Type', 'application/json');
    spaceshipJSON = lists.getJSONSpaceship();
    res.send(spaceshipJSON);
  }
});


//ASTRONAUT IMAGE
app.get('/GET-spaceshipImages', function (req, res) {
  let formatOfResponse = req.query['format'];
  let spaceshipImages = null;

  if (formatOfResponse == 'image') {

    res.setHeader('Content-Type', 'text/html');
    spaceShipImages = lists.getSpaceshipImages();
    res.send(spaceShipImages);
  }
});

//ASTRONAUT IMAGE 2
app.get('/GET-spaceshipImages2', function (req, res) {
  let formatOfResponse = req.query['format'];
  let spaceImage2 = null;

  if (formatOfResponse == 'html-image') {
    res.setHeader('Content-Type', 'text/html');
    spaceImage2 = lists.getSpaceshipImages2();
    res.send(spaceImage2);
  }
});

//ASTRONAUT IMAGE 3
app.get('/GET-spaceshipImages3', function (req, res) {
  let formatOfResponse = req.query['format'];
  let spaceImage3 = null;

  if (formatOfResponse == 'html-image') {
    res.setHeader('Content-Type', 'text/html');
    spaceImage3 = lists.getSpaceshipImages3();
    res.send(spaceImage3);
  }
});

//ASTRONAUT IMAGE 4
app.get('/GET-spaceshipImages4', function (req, res) {
  let formatOfResponse = req.query['format'];
  let spaceImage4 = null;

  if (formatOfResponse == 'html-image') {
    res.setHeader('Content-Type', 'text/html');
    spaceImage4 = lists.getSpaceshipImages4();
    res.send(spaceImage4);
  }
});

app.use(function (req, res, next) {
  res.status(404).send("Nothing there, 404.");
});


/////////////////////////////////////////////////////////////////////////////////////
//////////////////node login/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('express-flash', 'express-session');
const session = require('express-session');
const methodOverride = require('method-override');



const users = []; //Temporary, database should be used instead.
const initializePassport = require('./passport-config');
initializePassport(passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'));


// app.get('/', checkAuthenticated, (req, res) => {
//   // res.render('index.ejs', {name: req.user.name});
//   res.render('./public/lab7.html', {name: req.user.name});
// })


app.get('/login', checkNotAuthenticated, (req, res) => {
  // res.render('login.ejs');
  res.render('./views/login.html');
});


app.get('/register', checkNotAuthenticated, (req, res) => {
  // res.render('register.ejs');
  res.render('./public/views/register.html');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.post('/register', async (req, res) => {
  console.log('here')
  try {
      /**Asynchronous, waits. The value of 10 is the default
       * password length.
       */
      const hashedPassword = await bcrypt.hash(req.body.password, 10); 
      users.push({
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
      });
      console.log(Date.now().toString())

      /**Redirects to login page after successfully registering */
      res.redirect('./public/views/login.html')
  } catch {
      /**Redirects to register page in case of error */
      res.redirect('./public/views/register.html');
  }
})


app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
});


/** 
* The following functions check if a user is logged in or 
* not. Depending on if they are logged in or not, user will
* be redirected. The purpose is that users shouldn't be able
* to access login or register pages if they are already logged
* in.
*/
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  } 

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return res.redirect('/');
  }

  next();
}

let port = 8000;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});


/**************************
 * To finish:
 * 1. If successful, should route back to main page 
 * 2. Customize the main page to include name?
 * 3. Style login and register pages.
 * 
 */