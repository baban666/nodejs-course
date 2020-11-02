const { helpers } = require('../common/helpers');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
module.exports = ({ userModel }) => ({
  checkLoginAndPass: async (userLogin, pass) => {
    const user = await userModel.Instance.findOne({ login: userLogin }).exec();
    if (!user) {
      return null;
    }
    const { password } = user;
    const isPasswordCorrect = await helpers.checkPassword(pass, password);
    if (isPasswordCorrect) {
      const { id, login } = user;
      const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
      return token;
    }
    return null;
  }
});
