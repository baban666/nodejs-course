module.exports = ({ user }) => ({
  add: async payload => {
    const { name, login, password } = payload;
    const c = new user.Instance({
      name,
      login,
      password
    });

    return c.save();
  },

  delete: async _id => {
    return user.Instance.findOneAndDelete({ _id });
  },

  update: async (_id, payload) => {
    return user.Instance.findOneAndUpdate({ _id }, payload);
  },

  get: async _id => {
    return user.Instance.findById(_id);
  },

  getAll: async () => {
    return user.Instance.find();
  }
});
