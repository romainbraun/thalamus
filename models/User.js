var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  google: {
    id: String,
    email: String,
    token: String,
    name: String,
    picture: String
  },
  passed: [{type : mongoose.Schema.ObjectId, ref : 'Test'}],
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', UserSchema);