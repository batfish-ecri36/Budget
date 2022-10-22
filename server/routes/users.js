const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

// router.get('/', 
//   usersController.getUser,
//   (req, res) => {
//     res.status(200).json(res.locals.user)}
// );

router.get('/',
    usersController.getUsers,
  (req, res) => res.status(200).send(res.locals.users)
);

router.post('/login', 
    usersController.verifyUser,
    (req, res) => { 
    //res.status(200).json(res.locals.users)
    res.redirect('/main');
    }
);

router.post('/signup',
    usersController.createUser,
  (req, res) => res.status(200).send("added")
);

module.exports = router;