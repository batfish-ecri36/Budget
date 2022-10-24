const express = require('express');
const usersController = require('../controllers/usersController');
const cryptoController = require('../controllers/cryptoController');
const router = express.Router();

router.get('/', usersController.getUsers, (req, res) =>
  res.status(200).send(res.locals.users)
);

router.post(
  '/login',
  usersController.verifyUser,
  usersController.addTransactions,
  cryptoController.decryptData,
   (req, res) => {
  return res.status(200).json(res.locals.transactions);
});

router.post('/signup', usersController.createUser, (req, res) =>
  res.status(200).send('added')
);

module.exports = router;
