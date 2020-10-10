const db = require('../../common/db');

module.exports = ({ task }) => ({
  create: async (id, payload) => {
    const c = new task.Instance({
      ...payload,
      boardId: id
    });
    db.save('tasks', c);
    return c;
  },

  delete: async id => {
    return db.findOneAndDelete('tasks', id);
  },

  update: async (id, payload) => {
    return db.updateOne('tasks', id, payload);
  },
  //
  getById: async taskId => {
    return db.findById('tasks', taskId);
  },

  getAll: async id => {
    const board = db.getAll('boards');
    if (!board) return;
    const tasks = db.getAll('tasks');
    if (!tasks) return [];
    return tasks.filter(({ boardId }) => boardId === id);
  }
});
