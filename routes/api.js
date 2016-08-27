var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Test = require('../models/Test.js');
var Question = require('../models/Question.js');

/* GET /questions listing. */
router.get('/tests', function(req, res, next) {
  Test.find(function (err, tests) {
    if (err) return next(err);
    res.json(tests);
  });
});

/* GET /questions listing. */
router.get('/questions', function(req, res, next) {
  Question.find({test_id: req.query.test_id}, function (err, questions) {
    if (err) return next(err);
    res.json(questions);
  });
});

/* GET /questions listing. */
router.get('/tests/:id', function(req, res, next) {
  Test.findOne({_id: req.params.id}, function (err, tests) {
    if (err) return next(err);
    res.json(tests);
  });
});

/* GET /questions listing. */
router.post('/tests', function(req, res, next) {
  var test = req.body;
  Test.create(test, function (err, response) {
    if (err) return next(err);
    res.json(response);
  });
});

/* GET /questions listing. */
router.post('/questions', function(req, res, next) {
  var question = req.body;
  Question.create(question, function (err, response) {
    if (err) return next(err);
    res.json(response);
  });
});

module.exports = router;