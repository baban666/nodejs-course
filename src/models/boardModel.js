const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const schema = new Schema(
  {
    title: {
      type: String,
      default: 'Title'
    },
    columns: {
      type: Array,
      default: []
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

schema.statics.toResponse = ({ id, columns, title }) => ({
  id,
  columns,
  title
});

const Board = model('Board', schema);

module.exports = { Instance: Board, Schema };
