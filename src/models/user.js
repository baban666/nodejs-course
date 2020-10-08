const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String,
  login: String,
  password: String
});

const User = model('User', schema);

module.exports = { Instance: User, Schema };
