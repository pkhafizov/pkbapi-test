const express = require('express');
const controller = require('../controllers/portfolioController');

function routes(pgDb) {
  const portfolioRouter = express.Router();
  const portfolioController = controller(pgDb);

  portfolioRouter.route('/portfolios').get(portfolioController.get);
  portfolioRouter.route('/portfolios/:portfolioId/monthly').get(portfolioController.getMonthly);
  portfolioRouter.route('/portfolios/efficiency').get(portfolioController.getEfficiency);
  portfolioRouter.route('/portfolios/:portfolioId/efficiency').get(portfolioController.getPortfolioEfficiency);

  return portfolioRouter;
}

module.exports = routes;
