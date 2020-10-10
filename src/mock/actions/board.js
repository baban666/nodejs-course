const db = require('../../common/db');
const Column = require('../models/column');

module.exports = ({ board }) => ({
  create: async payload => {
    const { columns, title } = payload;
    const newColumns = columns
      ? columns.map(column => {
          const { title: t, order } = column;
          const col = new Column({ title: t, order });
          return { ...col };
        })
      : [];

    const newBoard = new board.Instance({
      title: title || 'title',
      columns: newColumns
    });

    db.save('boards', newBoard);
    return newBoard;
  },

  delete: async id => {
    const tasks = db.getAll('tasks');
    db.tasks = tasks.filter(item => item.boardId !== id);
    return db.findOneAndDelete('boards', id);
  },

  update: async (id, payload) => {
    return db.updateOne('boards', id, payload);
  },

  getById: async id => {
    return db.findById('boards', id);
  },

  getAll: async () => {
    return db.getAll('boards');
  }
});
