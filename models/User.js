var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  google: {
    id: String,
    email: String,
    token: String,
    name: String
  },
  passed: Boolean,
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', UserSchema);