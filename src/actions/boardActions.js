const Column = require('../models/columnModel');

module.exports = ({ boardModel, taskModel }) => ({
  add: async payload => {
    const { columns, title = 'title' } = payload;
    const newColumns = columns
      ? columns.map(column => {
          const { title: t, order } = column;
          const col = new Column({ title: t, order });
          return { ...col };
        })
      : [];

    const result = await boardModel.Instance.create({
      title,
      columns: newColumns
    });
    return boardModel.Instance.toResponse(result);
  },

  delete: async id => {
    const isDeleted = (await boardModel.Instance.deleteOne({ _id: id })).ok;
    await taskModel.Instance.deleteMany({ boardId: id });
    return isDeleted;
  },

  update: async (id, payload) => {
    const isUpdate = (await boardModel.Instance.updateOne({ _id: id }, payload))
      .ok;
    return isUpdate === 1 ? payload : undefined;
  },

  get: async id => {
    const board = await boardModel.Instance.findById(id);
    return board !== null ? boardModel.Instance.toResponse(board) : undefined;
  },

  getAll: async () => {
    const boards = await boardModel.Instance.find({}).exec();
    return boards.map(boardModel.Instance.toResponse);
  }
});
