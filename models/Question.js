var mongoose = require('mongoose'),
    Answer = require('./Answer').schema;

var QuestionSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: {type: String, default: 'open'},
  answers: [Answer],
  test_id: {type : mongoose.Schema.ObjectId, ref : 'Test'},
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Question', QuestionSchema);