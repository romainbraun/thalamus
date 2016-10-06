var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  user_id: {type : mongoose.Schema.ObjectId, ref : 'User'},
  question_id: {type : mongoose.Schema.ObjectId, ref : 'Question'},
  test_id: {type : mongoose.Schema.ObjectId, ref : 'Test'},
  content: String,
  correct: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = {
  schema: AnswerSchema,
  model:mongoose.model('Answer', AnswerSchema)
};