var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/Question.js');
/* GET /questions listing. */
router.get('/', function(req, res, next) {
  Question.find(function (err, questions) {
    if (err) return next(err);
    res.json(questions);
  });
});

router.get('/:id', function(req, res, next) {
  Question.findOne({_id: req.params.id}, function (err, question) {
    // res.json(err);
    if (err) return next(err);
    res.json(question);
  });
});

router.post('/', function(req, res, next) {
  Question.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;