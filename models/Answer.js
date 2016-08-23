var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  name: String,
  question_id: mongoose.Schema.Types.ObjectId,
  answer_id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId,
  answer_text: String,
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Answer', AnswerSchema);