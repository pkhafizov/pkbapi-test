const express = require('express');
const debug = require('debug')('app');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('tiny'));
app.get('/', (req, res) => {
  res.send('PKB API');
});
app.listen(port, () => {
  debug(`Running on port ${port}`);
});

module.exports = app;
