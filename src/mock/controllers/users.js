module.exports = ({ router, actions, models }) => {
  const routes = router();
  const user = actions.user(models);

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

    res.json(target);
  });

  routes.delete('/:id', async (req, res) => {
    const target = await user.delete(req.params.id);

    res.json(target);
  });

  routes.put('/:id', async (req, res) => {
    const target = await user.update(req.params.id, req.body);

    res.json(target);
  });

  return routes;
};
