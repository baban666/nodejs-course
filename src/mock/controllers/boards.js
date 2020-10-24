module.exports = ({ router, actions: { boardActions }, models }) => {
  const routes = router();
  const board = boardActions(models);

  routes.get('/', async (req, res) => {
    const boards = await board.getAll();
    res.json(boards);
  });

  routes.get('/:id', async (req, res) => {
    const target = await board.getById(req.params.id);
    if (!target) {
      return res.status(404).send('Not Found');
    }
    res.json(target);
  });
  //
  routes.post('/', async (req, res) => {
    const target = await board.create(req.body);
    res.json(target);
  });

  routes.delete('/:id', async (req, res) => {
    try {
      await board.delete(req.params.id);
      res.status(204).send('The board has been deleted');
    } catch (err) {
      res.status(404).send('Not found');
    }
  });

  routes.put('/:id', async (req, res) => {
    const target = await board.update(req.params.id, req.body);
    res.json(target);
  });

  return routes;
};
