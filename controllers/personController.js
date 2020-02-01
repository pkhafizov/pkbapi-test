function personController(pgDb) {
  function get(req, res) {
    // prettier-ignore
    ((async () => {
      const { rows } = await pgDb.getPerson();
      return res.json(rows);
    })());
  }
  function getCount(req, res) {
    (async () => {
      const { rows } = await pgDb.getPersonCount();
      return res.json(rows);
    })();
  }
  function getLimit150(req, res) {
    (async () => {
      const { rows } = await pgDb.getPersonLimit150();
      return res.json(rows);
    })();
  }

  return { get, getCount, getLimit150 };
}

module.exports = personController;
