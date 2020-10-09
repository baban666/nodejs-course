const db = require('../../common/db');

module.exports = ({ user }) => ({
  create: async payload => {
    const { id, name, login, password } = payload;
    const c = new user.Instance({
      id,
      name,
      login,
      password
    });
    db.save('users', c);
    return c;
  },

  delete: async id => {
    return db.findOneAndDelete('users', id);
  },

  update: async (id, payload) => {
    return db.updateOne('users', id, payload);
  },

  getById: async id => {
    return db.findById('users', id);
  },

  getAll: async () => {
    return db.getAll('users');
  }
});
