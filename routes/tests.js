var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Test = require('../models/Test.js');

router.get('/', function(req, res, next) {
  Test.find(function (err, tests) {
    if (err) return next(err);
    res.json(tests);
  });
});

router.get('/:id', function(req, res, next) {
  console.log(req.user);
  Test.findOne({_id: req.params.id}, function (err, test) {
    if (err) return next(err);
    res.json(test);
  });
});

router.post('/', function(req, res, next) {
  var test = req.body;
  Test.create(test, function (err, response) {
    if (err) return next(err);
    res.json(response);
  });
});

module.exports = router;