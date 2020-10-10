module.exports = ({ router, actions, models }) => {
  const routes = router();
  const user = actions.user(models);

  routes.get('/', async (req, res) => {
    const users = await user.getAll();
    res.json(users);
  });

  routes.get('/:id', async (req, res) => {
    const target = await user.getById(req.params.id);
    res.json(target);
  });

  routes.post('/', async (req, res) => {
    const target = await user.create(req.body);
    const newUser = {
      id: target.id,
      name: target.name,
      login: target.login
    };
    res.json(newUser);
  });

  routes.delete('/:id', async (req, res) => {
    const target = await user.delete(req.params.id);
    res.json(target);
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
