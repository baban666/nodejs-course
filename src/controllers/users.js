module.exports = ({ router, actions: { userActions }, models }) => {
  const routes = router();
  const user = userActions(models);

  routes.get('/', async (req, res) => {
    const users = await user.getAll();
    res.json(users);
  });

  routes.get('/:id', async (req, res) => {
    const target = await user.get(req.params.id);
    res.json(target);
  });

  routes.post('/', async (req, res) => {
    const target = await user.add(req.body);
    const newUser = {
      id: target.id,
      name: target.name,
      login: target.login
    };
    res.json(newUser);
  });

  routes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const isDeleted = await user.delete(id);
    if (isDeleted) {
      res.status(204).send('user was delete');
    }
  });

  routes.put('/:id', async (req, res) => {
    const target = await user.update(req.params.id, req.body);
    const newUser = {
      id: target.id,
      name: target.name,
      login: target.login
    };
    res.json(newUser);
  });

  return routes;
};
