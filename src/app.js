const express = require('express');
const userController = require('./controller/userController');
const categoryController = require('./controller/categoryController');
const postController = require('./controller/postController');
const { authToken } = require('./middlewares/auth');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.createUser);
app.get('/user', authToken, userController.findUser);
app.get('/user/:id', authToken, userController.findUserById);
app.post('/categories', authToken, categoryController.createCategory);
app.get('/categories', authToken, categoryController.findCategory);
app.post('/post', authToken, postController.createPost);
app.get('/post', authToken, postController.findPost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
