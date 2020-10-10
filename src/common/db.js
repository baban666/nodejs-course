const db = {
  users: [
    { id: '1', name: 'user 1', login: 'doe 1', password: 12 },
    { id: '2', name: 'user 2', login: 'joe 2', password: 13 }
  ],
  boards: [
    { id: '1', title: 'board 1', columns: 'column 1' },
    { id: '2', title: 'board 2', columns: 'column 2' }
  ],
  tasks: [
    {
      id: '1',
      title: 'task',
      order: '1',
      description: 'description 1',
      userId: '1', // assignee
      boardId: '1',
      columnId: '1'
    },
    {
      id: '2',
      title: 'task',
      order: '2',
      description: 'description 2',
      userId: '2', // assignee
      boardId: '2',
      columnId: '2'
    }
  ],
  columns: [
    { id: '1', title: 'column 1', order: '1' },
    { id: '1', title: 'column 1', order: '1' }
  ],
  getAll: resource => {
    return db[resource];
  },
  save: (resource, payload) => {
    db[resource].push(payload);
    // return db[resource].find(item => item.id === payload.id);
  },
  findById: (resource, id) => {
    return db[resource].find(item => item.id === id);
  },
  findOneAndDelete: (resource, id) => {
    const deleted = db[resource].find(item => item.id === id);
    const newUsers = db[resource].filter(item => item.id !== id);
    db[resource] = [...newUsers];
    return deleted;
  },
  updateOne: (resource, id, newData) => {
    const updateData = db[resource].map(item => {
      if (item.id === id) {
        const newItem = {
          ...item,
          ...newData
        };
        return newItem;
      }
      return item;
    });
    db[resource] = [...updateData];
    return db[resource].find(item => item.id === id);
  }
};

module.exports = db;
