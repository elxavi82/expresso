const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 4000;
const apiRouter = require('./api/api');

module.exports = app;

app.use('/api', cors(), bodyParser.json(), morgan('dev'), apiRouter);

app.listen(PORT, ()=> {
    console.log(`Server is up. Port: ${PORT}`);
  });