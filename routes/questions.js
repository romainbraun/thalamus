var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/Question.js');

router.get('/', function(req, res, next) {
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

router.get('/:id', function(req, res, next) {
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

router.post('/', function(req, res, next) {
  var question = req.body;
  Question.create(question, function (err, response) {
    if (err) return next(err);
    res.json(response);
  });
});

module.exports = router;