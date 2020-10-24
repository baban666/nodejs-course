const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const schema = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

schema.statics.toResponse = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => ({ id, title, order, description, userId, boardId, columnId });

const Task = model('Task', schema);

module.exports = { Instance: Task, Schema };
