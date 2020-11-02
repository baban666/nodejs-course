const { StatusCodes } = require('http-status-codes');
module.exports = ({ router, actions: { loginActions }, models }) => {
  const routes = router();
  const loginUser = loginActions(models);

  routes.post('/', async (req, res) => {
    const { login, password } = req.body;
    const token = await loginUser.checkLoginAndPass(login, password);
    if (!token) {
      res.status(403).send('Wrong login/password combination!');
    } else {
      res.status(StatusCodes.OK).json({ token });
    }
  });

  return routes;
};
