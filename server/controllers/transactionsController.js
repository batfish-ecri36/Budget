const db = require('../models/budgetModel');

const transactionsController = {};

transactionsController.addTransactions = (req, res, next) => {
  //add params id so we can target which user to add the expense to
  const { id } = req.params;
  const { item, amount, date, category } = req.body;
  //adding the id as the first element to newTransactions
  const newTransactions = [id, item, amount, date, category];
  console.log(newTransactions);
  const text = `INSERT INTO transactions (user_id, item, amount, date, category) VALUES ($1, $2, $3, $4, $5)`;
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

transactionsController.deleteTransactions = async (req, res, next) => {
  const { id } = req.params;
  //This needs to be edited to delete specific transactions by looking for item and date :))

  const text = `DELETE FROM transactions WHERE _id=${id}`;
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
