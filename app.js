const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
app.use(morgan('tiny'));
const port = process.env.PORT || 3000;
const pgDb = require('./db/pgDb');
const personRouter = require('./routes/personRouter')(pgDb);
const portfolioRouter = require('./routes/portfolioRouter')(pgDb);

app.use('/api', [personRouter, portfolioRouter]);

app.get('/', (req, res) => {
  res.send('PKB API');
});
app.listen(port, () => {
  debug(`Running on port ${port}`);
});

module.exports = app;
