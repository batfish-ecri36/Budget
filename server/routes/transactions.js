const express = require('express');

const transactionsController = require('../controllers/transactionsController');
const cryptoController = require('../controllers/cryptoController');

const router = express.Router();

router.get('/', 
  transactionsController.getTransactions,
  cryptoController.decryptData,
  (req, res) => {
    res.status(200).json(res.locals.transactions)}
);

router.post('/',
  cryptoController.encryptData,
  transactionsController.addTransactions,
  (req, res) => res.status(200).send("added")
);

router.put('/',
    transactionsController.updateTransactions,
  (req, res) => res.status(200).json(res.locals.transactions)
);

router.delete('/',
  transactionsController.deleteTransactions,
  (req, res) => res.status(200).send("deleted")
);

module.exports = router;