const express = require('express');
const { MONGO_CONNECTION_STRING, TASK_NUMBER } = require('./common/config');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const inject = require('require-all');
const mongoose = require('mongoose');
const { incomingLogger, errorLogger } = require('./middlewares/logger');
// const userRouter = require('./resources/users/user.router');
const router = express.Router;
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

let mock = '';

if (TASK_NUMBER === '2') {
  mock = '/mock';
}

const controllers = inject(`${__dirname}${mock}/controllers`);
const actions = inject(`${__dirname}${mock}/actions`);
const models = inject(`${__dirname}${mock}/models`);

mongoose.connect(MONGO_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.info('Dababase - connected!');
});

app.use(incomingLogger);
// eslint-disable-next-line guard-for-in
for (const name in controllers) {
  app.use(
    `/${name === 'tasks' ? 'boards' : name}`,
    controllers[name]({ router, actions, models })
  );
}
app.use(errorLogger);

module.exports = app;
