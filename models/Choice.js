var mongoose = require('mongoose');

var ChoiceSchema = new mongoose.Schema({
  name: String,
  correct: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = {
  schema: ChoiceSchema,
  model: mongoose.model('Choice', ChoiceSchema)
};