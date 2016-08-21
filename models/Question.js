var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  test_id: ObjectId,
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Question', QuestionSchema);