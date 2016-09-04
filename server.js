var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('./models/User.js');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(__dirname + '/public'));
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
    User.findOne({ 'google.id' : profile.id }, function(err, user) {
      if (err) return done(err);

      if (user) {
        return done(null, user);
      } else {
        var newUser          = new User();
        newUser.google.id    = profile.id;
        newUser.google.token = token;
        newUser.google.name  = profile.displayName;
        newUser.google.email = profile.emails[0].value; // pull the first email

        // save the user
        newUser.save(function(err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findOne({_id: id}, function(err, user) {
        done(err, user);
    });
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', isLoggedIn, function (req, res) {
  console.log('HOME');
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/login', function (req, res) {
  console.log('LOGIN');
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});
// app.use('/questions', questions);
// app.use('/questions', questions);
// app.use('/admin', admin);
app.use('/api', api);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.redirect('/');
  });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({
    message: err.message,
    error: {}
  });
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/thalamus')
  .then(function() { 
    console.log('connection succesful');
  })
  .catch(function(err) { 
    console.error(err);
  });

function isLoggedIn(req, res, next) {
  console.log('yo!');
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // res.render(req);
    // if they aren't redirect them to the home page
    console.log('FAILURE');
    res.redirect('/login');
}


module.exports = app;
