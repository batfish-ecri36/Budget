const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/', 
  usersController.getUser,
  (req, res) => {
    res.status(200).json(res.locals.user)}
);

router.post('/',
    usersController.addUser,
  (req, res) => res.status(200).send("added")
);

module.exports = router;