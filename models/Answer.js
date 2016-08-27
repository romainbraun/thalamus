var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  name: String,
  correct: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = {
  schema: AnswerSchema,
  model:mongoose.model('Answer', AnswerSchema)
};