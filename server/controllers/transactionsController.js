const db = require('../models/budgetModel');

const transactionsController = {};

transactionsController.addTransactions = (req, res, next) => {
    console.log("add transactions")
    const { newTransactions } = req.body
    const text = `INSERT INTO transactions (id, user_id, item, amount, date, category) VALUES ($1, $2, $3, $4, $5, $6)`;
    db.query(text, newTransactions, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
    }});
    
    next();
};

transactionsController.getTransactions = async (req, res, next) => {
  console.log("get transactions")
  const queryString = req.query.id;
  const text =`SELECT t.* FROM transactions t WHERE t.user_id=1`
  const result = await db.query(text)
  .then((data) => {
    res.locals.transactions = data.rows[0];
  })
  .catch((error) => {
    console.log("Error getTransactions",error);
  })

  next();
};

transactionsController.deleteTransactions = async (req, res, next) => {
    const queryString = req.query.id;
    const text ='DELETE FROM transactions WHERE id=${queryString}' 
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
    const queryString = req.query.id;
    const text = `UPDATE transactionsSET item = '${req.body.item}' amount = '${req.body.amount}'  WHERE id = ${queryString}`;
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