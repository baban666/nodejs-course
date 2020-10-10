const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/users').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.findById(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  await usersService.addUser(user);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const updatedUser = await usersService.updateOne(req.params.id, req.body);
  console.log(req.body, req.params.id);
  res.json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteById(req.params.id);
  res.json(req.params.id);
});

module.exports = router;
