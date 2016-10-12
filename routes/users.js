var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

router.post('/', function(req, res, next) {
  var user = req.body;
  User.create(user, function (err, response) {
    if (err) return next(err);
    res.json(response);
  });
});

router.get('/', function(req, res, next) {
  User
    .find()
    .populate('passed')
    .exec(function (err, users) {
      if (err) return next(err);

      res.json(users);
  });
});

router.get('/me', function(req, res, next) {
  User.findOne({_id: req.user.id}, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

router.post('/passed', function(req, res, next) {
  var test = req.body.test,
      user = req.user;

  console.log(test, user._id);

  User.findOneAndUpdate(
    {_id: user._id},
    {
      $push: {
        passed: test
      }
    },
    {new: true},
    function(err, model) {
      if (err) return next(err);
      res.json(model);
    }
  );

  
});

module.exports = router;