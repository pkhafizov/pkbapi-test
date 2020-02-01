const express = require('express');
const controller = require('../controllers/personController');

function routes(pgDb) {
  const personRouter = express.Router();
  const personController = controller(pgDb);

  personRouter.route('/persons').get(personController.get);
  personRouter.route('/persons/count').get(personController.getCount);
  personRouter.route('/persons/limit150').get(personController.getLimit150);

  return personRouter;
}

module.exports = routes;
