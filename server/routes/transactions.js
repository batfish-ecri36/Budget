const express = require('express');

const transactionsController = require('../controllers/transactionsController');

const router = express.Router();

router.get('/', transactionsController.getTransactions,
  (req, res) => {
    res.status(200).json(res.locals.transactions)}
);

router.post('/',
    transactionsController.addTransactions,
  (req, res) => res.status(200).json({})
);

router.put('/:id',
    transactionsController.updateTransactions,
  (req, res) => res.status(200).send("updated")
);

router.delete('/:id',
  transactionsController.deleteTransactions,
  (req, res) => res.status(200).send("deleted")
);

module.exports = router;