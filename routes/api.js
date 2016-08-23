var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Test = require('../models/Test.js');

/* GET /questions listing. */
router.get('/tests', function(req, res, next) {
  Test.find(function (err, tests) {
    if (err) return next(err);
    res.json(tests);
  });
});

/* GET /questions listing. */
router.post('/tests', function(req, res, next) {
  console.log(req.body);
  Test.create(req.body, function (err, test) {
    if (err) return next(err);
    res.json(test);
  });
});

module.exports = router;