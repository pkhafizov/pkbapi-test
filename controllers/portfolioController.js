function portfolioController(pgDb) {
  function get(req, res) {
    // prettier-ignore
    ((async () => {
      const { rows } = await pgDb.getPortfolio();
      return res.json(rows);
    })());
  }
  function getMonthly(req, res) {
    // prettier-ignore
    ((async () => {
      const { rows } = await pgDb.getPortfolioMonthly(req.params.portfolioId);
      return res.json(rows);
    })());
  }
  function getEfficiency(req, res) {
    // prettier-ignore
    ((async () => {
      const { rows } = await pgDb.getPortfoliosEfficiency();
      return res.json(rows);
    })());
  }
  function getPortfolioEfficiency(req, res) {
    // prettier-ignore
    ((async () => {
      const { rows } = await pgDb.getThPortfolioEfficiency(req.params.portfolioId);
      return res.json(rows);
    })());
  }

  return {
    get,
    getMonthly,
    getEfficiency,
    getPortfolioEfficiency
  };
}

module.exports = portfolioController;
