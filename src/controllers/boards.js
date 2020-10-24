module.exports = ({ router, actions: { boardActions }, models }) => {
  const routes = router();
  const board = boardActions(models);

  routes.get('/', async (req, res) => {
    const boards = await board.getAll();
    res.json(boards);
  });

  routes.get('/:boardId', async (req, res) => {
    const target = await board.get(req.params.boardId);
    if (!target) {
      res.status(404).send('Not found');
    }
    res.json(target);
  });

  routes.post('/', async (req, res) => {
    const target = await board.add(req.body);
    res.json(target);
  });

  routes.put('/:boardId', async (req, res) => {
    const target = await board.update(req.params.boardId, req.body);
    res.json(target);
  });

  routes.delete('/:boardId', async (req, res) => {
    try {
      const result = await board.delete(req.params.boardId);
      if (!result) {
        res.status(404).send('Not found');
      }
      res.status(204).send('The board has been deleted');
    } catch (err) {
      res.status(404).send('Not found');
    }
  });

  return routes;
};
