let users = [
  { id: '1', name: 'jon', login: 'doe', password: 12 },
  { id: '2', name: 'kol', login: 'joe', password: 13 }
];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const addUser = async user => {
  users.push(user);
  return users;
};

const findById = async id => {
  const user = users.find(item => item.id === id);
  return user;
};

const updateOne = async (id, newData) => {
  const updateData = users.map(item => {
    if (item.id === id) {
      const newUser = {
        id: item.id,
        name: newData.name,
        login: newData.login,
        password: newData.password
      };
      return newUser;
    }
    return item;
  });
  users = [...updateData];
  return users.find(item => item.id === id);
};

const deleteById = async id => {
  const newUsers = users.filter(item => item.id !== id);
  users = [...newUsers];
};

module.exports = { getAll, addUser, findById, updateOne, deleteById };
