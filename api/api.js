const express = require('express');
const apiRouter = express.Router();
const employeeRouter = require('./Employee/Employee');
const menuRouter = require('./Menu/Menu');

apiRouter.use('/employees', employeeRouter);
apiRouter.use('/menus', menuRouter);

module.exports = apiRouter;