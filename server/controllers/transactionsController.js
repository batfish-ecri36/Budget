const db = require('../models/budgetModel');

const transactionsController = {};

transactionsController.addTransactions = (req, res, next) => {
  //add params id so we can target which user to add the expense to
  const { id } = req.params;
  const { item, amount, date, category } = req.body;
  //adding the id as the first element to newTransactions
  const newTransactions = [id, item, amount, date, category];
  console.log(newTransactions);
  const text = `INSERT INTO encrypted_transactions (user_id, item, amount, date, category) VALUES ($1, $2, $3, $4, $5)`;
  db.query(text, newTransactions, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('added to database');
    }
  });
  next();
};

transactionsController.getTransactions = async (req, res, next) => {
  //fixed the query string to accept passed in params
  const id = req.params.id;
  //cannot use req.body because we can't send a response body from the front
  //end with a get request (only from a post request)

  // const queryString = req.body.user_id;

  const text = `SELECT * FROM encrypted_transactions WHERE user_id=${id};`;
  const result = await db
    .query(text)
    .then((data) => {
      res.locals.transactions = data.rows;
    })
    .catch((error) => {
      console.log('Error getTransactions', error);
    });

  next();
};

transactionsController.getCustomTransactions = async (req, res, next) => {
  const id = req.params.id;
  const { time, category } = req.body;

  const text = `
  select date_trunc('${time}', date) as ${time}, SUM(amount) AS total_${time}_net_expense 
  from encrypted_transactions
  WHERE user_id = ${id} and category='${category}'
  group by ${time}
  order by ${time} ASC;`;

  const result = await db
    .query(text)
    .then((data) => {
      res.locals.transactions = data.rows;
    })
    .catch((error) => {
      console.log('Error getTransactions', error);
    });

  next();
};

transactionsController.getMonthlyTransactions = async (req, res, next) => {
  const id = req.params.id;

  //const { time, category } = req.body;

  const text = `
  select date_trunc('month', date) as month, SUM(amount) AS total_month_net_expense 
  from encrypted_transactions
  WHERE user_id = ${id}
  group by month
  order by month ASC;`;

  const result = await db
    .query(text)
    .then((data) => {
      res.locals.transactions = data.rows;
    })
    .catch((error) => {
      console.log('Error getTransactions', error);
    });

  next();
};

transactionsController.getQuarterlyTransactions = async (req, res, next) => {
  const id = req.params.id;

  const text = `
  select date_trunc('quarter', date) as quarter, SUM(amount) AS total_quarter_net_expense 
  from encrypted_transactions
  WHERE user_id = ${id}
  group by quarter
  order by quarter ASC;`;

  const result = await db
    .query(text)
    .then((data) => {
      res.locals.transactions = data.rows;
    })
    .catch((error) => {
      console.log('Error getTransactions', error);
    });

  next();
};

transactionsController.getWeeklyTransactions = async (req, res, next) => {
  const id = req.params.id;

  const text = `
  select date_trunc('week', date) as week, SUM(amount) AS total_week_net_expense 
  from encrypted_transactions
  WHERE user_id = ${id}
  group by week
  order by week ASC;`;

  const result = await db
    .query(text)
    .then((data) => {
      res.locals.transactions = data.rows;
    })
    .catch((error) => {
      console.log('Error getTransactions', error);
    });

  next();
};

transactionsController.getYearlyTransactions = async (req, res, next) => {
  const id = req.params.id;

  const text = `
  select date_trunc('year', date) as year, SUM(amount) AS total_year_net_expense 
  from encrypted_transactions
  WHERE user_id = ${id}
  group by year
  order by year ASC;`;

  const result = await db
    .query(text)
    .then((data) => {
      res.locals.transactions = data.rows;
    })
    .catch((error) => {
      console.log('Error getTransactions', error);
    });

  next();
};

transactionsController.deleteTransactions = async (req, res, next) => {
  const { id } = req.params;
  const { item, date } = req.body;
  const text = `DELETE FROM encrypted_transactions WHERE _id=${id}`;
  const result = await db
    .query(text)
    .then((data) => {
      res.locals.transactions = data;
    })
    .catch((error) => {
      console.log('Error delete transactions', error);
    });

  next();
};

transactionsController.updateTransactions = async (req, res, next) => {
  const { item, amount, date, category, _id } = req.body;
  const text = `UPDATE transactions SET item = '${item}', amount = '${amount}', date = '${date}', category = '${category}' WHERE _id = ${_id}`;
  const result = await db
    .query(text)
    .then((data) => {
      res.locals.transactions = data;
    })
    .catch((error) => {
      console.log('Error updateTransactions', error);
    });

  next();
};

module.exports = transactionsController;
