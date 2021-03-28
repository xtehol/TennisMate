const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  title: String,
  ntrp: Number,
  description: String,
  location: String
});

module.exports = mongoose.model('User', UserSchema);