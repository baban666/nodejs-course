const { helpers } = require('../common/helpers');

module.exports = ({ userModel, taskModel }) => ({
  add: async payload => {
    const userData = {
      ...payload,
      password: await helpers.cryptData(payload.password)
    };
    const user = await userModel.Instance.create(userData);
    return userModel.Instance.toResponse(user);
  },

  delete: async id => {
    const isDeleted = (await userModel.Instance.deleteOne({ _id: id })).ok;
    await taskModel.Instance.updateMany({ userId: id }, { userId: null });
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
