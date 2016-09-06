var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Test = require('../models/Test.js');
var Question = require('../models/Question.js');
var User = require('../models/User.js');
var Answer = require('../models/Answer.js').model;
var Choice = require('../models/Choice.js').model;

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
      questions = questions.map(function(question) {
        return question._id;
      });
    }
    res.json(questions);
  });
});

router.get('/questions/:id', function(req, res, next) {
  Question.findOne({_id: req.params.id}, function (err, question) {
    if (err) return next(err);
    question = question.toObject();

    question.answers = question.answers.map(function(answer) {
      delete answer.correct;
      return answer;
    });
    
    res.json(question);
  });
});

router.get('/tests/:id', function(req, res, next) {
  console.log(req.user);
  Test.findOne({_id: req.params.id}, function (err, test) {
    if (err) return next(err);
    res.json(test);
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

router.post('/answers', function(req, res, next) {
  var answer = req.body;

  Question.findOne({_id: answer.question_id}, function(err, question) {
    if (err) return next(err);
    
    answer.correct = question.answers.some(function(choice) {
      return choice.id === answer.choice_id && choice.correct;
    });

    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return next(err);
      answer.user_id = user._id;

      Answer.create(answer, function (err, response) {
        if (err) return next(err);
        res.json(response);
      });
    });

    
  });
  
});

module.exports = router;