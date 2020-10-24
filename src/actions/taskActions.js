module.exports = ({ taskModel }) => ({
  add: async (id, payload) => {
    const task = await taskModel.Instance.create({
      ...payload,
      boardId: id
    });
    return taskModel.Instance.toResponse(task);
  },

  delete: async id => {
    const isDeleted = (await taskModel.Instance.deleteOne({ _id: id })).ok;
    return isDeleted;
  },

  update: async (id, payload) => {
    const isUpdate = (await taskModel.Instance.updateOne({ _id: id }, payload))
      .ok;
    return isUpdate === 1 ? taskModel.Instance.toResponse(payload) : undefined;
  },

  get: async (boardId, id) => {
    const tasks = await taskModel.Instance.findById(id);
    return tasks !== null ? taskModel.Instance.toResponse(tasks) : undefined;
  },

  getAll: async id => {
    const tasks = await taskModel.Instance.find({ boardId: id }).exec();
    return tasks.map(taskModel.Instance.toResponse);
  }
});
