const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: String,
  columns: String
});

const Board = model('Board', schema);

module.exports = { Instance: Board, Schema };
