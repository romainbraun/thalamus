var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/Question.js');
var User = require('../models/User.js');
var Answer = require('../models/Answer.js').model;

router.post('/', function(req, res, next) {
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

router.get('/:user/:test', function(req, res, next) {
  var answer = req.body;

  Answer
    .find({test_id: req.params.test, user_id: req.params.user})
    .populate('question_id')
    .exec(function(err, answers) {
      if (err) return next(err);

      res.json(answers);
  });
  
});

module.exports = router;