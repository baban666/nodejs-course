module.exports = ({ router, actions: { taskActions }, models }) => {
  const routes = router();
  const task = taskActions(models);

  routes.get('/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
    const tasks = await task.getAll(boardId);
    res.json(tasks);
  });

  routes.get('/:boardId/tasks/:id', async (req, res) => {
    const { boardId, id } = req.params;
    const target = await task.get(boardId, id);
    if (!target) {
      res.status(404).send('Not found');
    }
    res.json(target);
  });

  routes.post('/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
    const target = await task.add(boardId, req.body);
    res.json(target);
  });

  routes.delete('/:boardId/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const result = await task.delete(id);
    if (!result) {
      res.status(404).send('Not found');
    }
    res.status(200).send('OK');
  });

  routes.put('/:boardId/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await task.update(id, data);
    res.json(result);
  });

  return routes;
};
