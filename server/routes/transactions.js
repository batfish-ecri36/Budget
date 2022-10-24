const express = require('express');

const transactionsController = require('../controllers/transactionsController');

const router = express.Router();

//fixed the endpoint to request an endpoint with an id
router.get('/:id', transactionsController.getTransactions, (req, res) => {
  res.status(200).json(res.locals.transactions);
});

//fixed the endpoint to request an endpoint with an id
router.post('/:id', transactionsController.addTransactions, (req, res) =>
  res.status(200).send('added')
);

router.put('/', transactionsController.updateTransactions, (req, res) =>
  res.status(200).json(res.locals.transactions)
);

router.delete('/:id', transactionsController.deleteTransactions, (req, res) =>
  res.status(200).send('deleted')
);

module.exports = router;
