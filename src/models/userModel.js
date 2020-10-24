const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const schema = new Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

schema.statics.toResponse = ({ id, name, login }) => ({ id, name, login });
const User = model('User', schema);

module.exports = { Instance: User, Schema };
