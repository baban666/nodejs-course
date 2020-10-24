module.exports = ({ userModel }) => ({
  add: async payload => {
    const user = await userModel.Instance.create(payload);
    return userModel.Instance.toResponse(user);
  },
  //
  delete: async id => {
    const isDeleted = (await userModel.Instance.deleteOne({ _id: id })).ok;
    return isDeleted;
  },

  update: async (id, payload) => {
    const isUpdate = (await userModel.Instance.updateOne({ _id: id }, payload))
      .ok;
    return isUpdate === 1 ? payload : undefined;
  },

  get: async id => {
    const user = await userModel.Instance.findById(id);
    return user !== null ? userModel.Instance.toResponse(user) : undefined;
  },

  getAll: async () => {
    const users = await userModel.Instance.find({}).exec();
    return users.map(userModel.Instance.toResponse);
  }
});
