const express = require('express');

const transactionsController = require('../controllers/transactionsController');
const cryptoController = require('../controllers/cryptoController');

const router = express.Router();

//fixed the endpoint to request an endpoint with an id
router.get(
  '/:id',
  transactionsController.getTransactions,
  cryptoController.decryptData,
  (req, res) => {
    res.status(200).json(res.locals.transactions);
  }
);

router.get('/custom/:id', 
  transactionsController.getCustomTransactions,
  (req, res) => {
    res.status(200).json(res.locals.transactions)}
);

router.get('/weekly/:id', 
  transactionsController.getWeeklyTransactions,
  (req, res) => {
    res.status(200).json(res.locals.transactions)}
);
router.get('/monthly/:id', 
  transactionsController.getMonthlyTransactions,
  (req, res) => {
    res.status(200).json(res.locals.transactions)}
);

router.get('/quarterly/:id', 
  transactionsController.getQuarterlyTransactions,
  (req, res) => {
    res.status(200).json(res.locals.transactions)}
);
router.get('/yearly/:id', 
  transactionsController.getYearlyTransactions,
  (req, res) => {
    res.status(200).json(res.locals.transactions)}
);

//fixed the endpoint to request an endpoint with an id
router.post(
  '/:id',
  cryptoController.encryptData,
  transactionsController.addTransactions,
  (req, res) => res.status(200).send('added')
);

router.put(
  '/:id',
  // cryptoController.encryptData,
  transactionsController.updateTransactions,
  (req, res) => res.status(200).json(res.locals.transactions)
);



router.delete('/:id', 
  transactionsController.deleteTransactions, (req, res) =>
  res.status(200).send('deleted')
);

module.exports = router;
