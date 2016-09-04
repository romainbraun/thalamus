var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Test = require('../models/Test.js');
var Question = require('../models/Question.js');
var User = require('../models/User.js');

router.get('/tests', function(req, res, next) {
  Test.find(function (err, tests) {
    if (err) return next(err);
    res.json(tests);
  });
});

router.get('/questions', function(req, res, next) {
  Question.find({test_id: req.query.test_id}, function (err, questions) {
    if (err) return next(err);
    if (req.query.list) {
      questions = questions.map(function (question) {
        return question._id;
      });
    }
    res.json(questions);
  });
});

router.get('/questions/:id', function(req, res, next) {
  Question.findOne({_id: req.params.id}, function (err, question) {
    if (err) return next(err);
    res.json(question);
  });
});

router.get('/tests/:id', function(req, res, next) {
  Test.findOne({_id: req.params.id}, function (err, tests) {
    if (err) return next(err);
    res.json(tests);
  });
});

router.post('/tests', function(req, res, next) {
  var test = req.body;
  Test.create(test, function (err, response) {
    if (err) return next(err);
    res.json(response);
  });
});

router.post('/users', function(req, res, next) {
  var user = req.body;
  User.create(user, function (err, response) {
    console.log(err);
    if (err) return next(err);
    res.json(response);
  });
});

router.post('/questions', function(req, res, next) {
  var question = req.body;
  Question.create(question, function (err, response) {
    if (err) return next(err);
    res.json(response);
  });
});

module.exports = router;