var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  name: String,
  question_id: ObjectId,
  answer_id: ObjectId,
  user_id: ObjectId,
  answer_text: String,
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Answer', AnswerSchema);