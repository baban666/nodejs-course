const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const addUser = user => usersRepo.addUser(user);
const findById = id => usersRepo.findById(id);
const updateOne = (id, newData) => usersRepo.updateOne(id, newData);
const deleteById = id => usersRepo.deleteById(id);

module.exports = { getAll, addUser, findById, updateOne, deleteById };
