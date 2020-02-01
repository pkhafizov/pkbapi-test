const { Pool } = require('pg');

const user = process.env.RDS_USERNAME;
const password = process.env.RDS_PASSWORD;
const host = process.env.RDS_HOSTNAME;
const database = process.env.RDS_DB_NAME;
const portDb = process.env.RDS_PORT;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port: portDb
});

module.exports = {
  // Person
  getPerson: () => pool.query('select id_person,fio from person'),
  // prettier-ignore
  getPersonLimit150: () => pool.query('select d.id_person, p.FIO, sum(d.debt_sum) from person p inner join debt d on d.id_person = p.id_person group by d.id_person, p.FIO having sum(d.debt_sum) > 150'),
  getPersonCount: () => pool.query('select count(1) from person'),

  // Portfolio
  getPortfolio: () => pool.query('select id_portfolio,portfolio_name,sign_date,end_date from portfolio'),
  /* eslint-disable */
  getPortfolioMonthly: (portfolioId) =>
    pool.query(
      `with paymentMonthly as (select date_trunc('month',"Date") cal_date, id_portfolio, sum(payment_sum) portfolio_sum from payment p inner join debt d on d.id_debt = p.id_debt group by date_trunc('month',"Date"), id_portfolio)
        select c.cal_date, coalesce(portfolio_sum, 0) p_sum from 
        calendar c left join paymentMonthly p on c.cal_date = p.cal_date and p.id_portfolio = $1`,
      [portfolioId]
    ),
  getPortfoliosEfficiency: () =>
    pool.query(
      `select pf.id_portfolio, pf.portfolio_name, cast(((cast(sum(coalesce(payment_sum,0)) as numeric(14,2))/sum(coalesce(debt_sum,coalesce(payment_sum,1)))) * 100) as numeric(5,2)) percent
        from portfolio pf left join debt d on d.id_portfolio = pf.id_portfolio left join payment p on p.id_debt = d.id_debt group by pf.id_portfolio,pf.portfolio_name`
    ),
  getThPortfolioEfficiency: (portfolioId) =>
    pool.query(
      `with paymentMonthly as (select date_trunc('month',"Date") cal_date, id_portfolio, sum(payment_sum) portfolio_sum from payment p inner join debt d on d.id_debt = p.id_debt 
        group by date_trunc('month',"Date"), id_portfolio)
        , portfolioDebt as (
        select id_portfolio,sum(debt_sum) portfolio_bebt from debt group by id_portfolio
        )
        select c.cal_date, 
        cast(((cast(coalesce(pm.portfolio_sum,0) as numeric(14,2))/coalesce(pd.portfolio_bebt,coalesce(pm.portfolio_sum,1))) * 100) as numeric(5,2))
        from Calendar c left join paymentMonthly pm on pm.cal_date = c.cal_date and pm.id_portfolio = $1 left join portfolioDebt pd using(id_portfolio)`,
      [portfolioId]
    )
};
