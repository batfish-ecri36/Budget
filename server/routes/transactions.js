const express = require('express');

const transactionsController = require('../controllers/transactionsController');
const cryptoController = require('../controllers/cryptoController');

const router = express.Router();


//fixed the endpoint to request an endpoint with an id
router.get('/:id', 
  transactionsController.getTransactions,
  cryptoController.decryptData,
  (req, res) => {
    res.status(200).json(res.locals.transactions)}
);

//fixed the endpoint to request an endpoint with an id
router.post('/:id',
  cryptoController.encryptData,
  transactionsController.addTransactions,
  (req, res) => res.status(200).send("added")
);

router.put('/',
  cryptoController.encryptData,
  transactionsController.updateTransactions,
  (req, res) => res.status(200).json(res.locals.transactions)

);

router.delete('/:id', transactionsController.deleteTransactions, (req, res) =>
  res.status(200).send('deleted')
);

module.exports = router;
