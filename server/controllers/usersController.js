const db = require('../models/budgetModel');
const bcrypt = require('bcrypt');

const usersController = {};

usersController.getUsers = async (req, res, next) => {
  const text = `SELECT * FROM users`;
  const login = await db
    .query(text)
    .then((data) => {
      res.locals.user = data.rows;
    })
    .catch((error) => {
      console.log('Error getUser', error);
    });

  next();
};

usersController.addTransactions = async (req, res, next) => {
  const text = `SELECT * FROM encrypted_transactions WHERE user_id=${res.locals.userID} ORDER BY date ASC`;

  const transactions = await db
    .query(text)
    .then((data) => {
      //   console.log(res.locals.user);
      res.locals.user.push(data.rows);
      //   console.log(res.locals.user);
      res.locals.transactions = data.rows;
      req.params.id = res.locals.userID;
    })
    .catch((error) => {
      next(error);
    });

  next();
};

usersController.verifyUser = async (req, res, next) => {
  const array = [req.body.username];
  console.log(array);
  const text = `SELECT _id, username, password, token FROM users WHERE username=$1`;
  const login = await db
    .query(text, array)
    .then((data) => {
      const hash = data.rows[0].password;
      const correctPassword = bcrypt.compare(
        req.body.password,
        hash,
        function (err, result) {
          if (data.rows.length > 0 && result) {
            res.locals.user = [data.rows[0]];
            res.locals.userID = data.rows[0]._id;
            console.log(res.locals.userID);
            next();
          } else {
            console.log('wrong password or username');
            next(err);
          }
        }
      );
    })
    .catch((error) => {
      console.log('Error getUser', error);
      next(error);
    });

  //next();
};

usersController.createUser = async (req, res, next) => {
  const saltRounds = 10;
  const password = req.body.password;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const user = {
        username: req.body.username,
        password: hash,
        token: req.body.token,
      };

      const newEncryptedUser = [];

      for (let key in user) {
        newEncryptedUser.push(user[key]);
      }

      console.log(newEncryptedUser);

      const text = `INSERT INTO users (username, password, token) VALUES ($1, $2, $3)`;
      db.query(text, newEncryptedUser, (err, res) => {
        if (err) {
          next(err);
        } else {
          console.log('added to users database encrypted');
        }
      });

      next();
    });
  });

  //next();
};

module.exports = usersController;
