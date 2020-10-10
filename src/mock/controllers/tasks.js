module.exports = ({ router, actions, models }) => {
  const routes = router();
  const task = actions.task(models);

  routes.get('/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
    const tasks = await task.getAll(boardId);
    res.json(tasks);
  });

  routes.get('/:boardId/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const target = await task.getById(taskId);
    if (!target) {
      return res.status(404).send('Not Found');
    }
    res.json(target);
  });

  routes.post('/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
    const target = await task.create(boardId, req.body);
    res.json(target);
  });

  routes.delete('/:boardId/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    try {
      await task.delete(taskId);
      res.status(204).send('The task has been deleted');
    } catch (err) {
      res.status(404).send('bad');
    }
  });

  routes.put('/:boardId/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const target = await task.update(taskId, req.body);
    res.json(target);
  });

  return routes;
};
