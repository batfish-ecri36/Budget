const db = require('../models/budgetModel');

const transactionsController = {};

transactionsController.addTransactions = (req, res, next) => {

    const newTransactions = []
    for (let key in req.body) {
      newTransactions.push(req.body[key]);
    }
    const text = `INSERT INTO transactions (user_id, item, amount, date, category) VALUES ($1, $2, $3, $4, $5)`;
    db.query(text, newTransactions, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log("added to database")
    }});
    
    next();
};

transactionsController.getTransactions = async (req, res, next) => {
  console.log("get transactions")
  const queryString = req.body.user_id;
  console.log(queryString);
  const text =`SELECT * FROM transactions WHERE user_id=${queryString} LIMIT 10;`
  const result = await db.query(text)
  .then((data) => {
    res.locals.transactions = data.rows;
  })
  .catch((error) => {
    console.log("Error getTransactions",error);
  })

  next();
};

transactionsController.deleteTransactions = async (req, res, next) => {
    const queryString = req.body._id;
    const text =`DELETE FROM transactions WHERE _id=${queryString}` 
    const result = await db.query(text)
    .then((data) => {
      res.locals.transactions = data;
    })
    .catch((error) => {
      console.log("Error delete transactions", error);
    })

    next();
};

transactionsController.updateTransactions = async (req, res, next) => {
    const queryString = req.body._id;
    console.log(queryString);
    console.log(req.body);
    const text = `UPDATE transactions SET item = '${req.body.item}', amount = '${req.body.amount}', date = '${req.body.date}', category = '${req.body.category}' WHERE _id = ${queryString}`;
    const result = await db.query(text)
    .then((data) => {
      res.locals.transactions = data;
    })
    .catch((error) => {
      console.log("Error updateTransactions",error);
    })

    next();
};

module.exports = transactionsController;