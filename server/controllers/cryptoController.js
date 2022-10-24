const db = require('../models/budgetModel');
const cipher = require('../models/cipher');

const cryptoController = {};

cryptoController.encryptData = async (req, res, next) => {
  const user = [req.params.id];
  console.log(req.body);
  let password;
  const text = `SELECT password from users where _id = $1`;
  await db
    .query(text, user)
    .then((data) => {
      password = data.rows[0]['password'];
    })
    .catch((error) => {
      console.log('Error encryptData user query', error);
    });

  const key = cipher.keyFromPassword(password);
  req.body.item = cipher.encrypt(key, req.body.item);

  next();
};

cryptoController.decryptData = async (req, res, next) => {
  const user = [req.params.id];
  let password;
  const text = `SELECT password from users where _id = $1`;
  await db
    .query(text, user)
    .then((data) => {
      password = data.rows[0]['password'];
    })
    .catch((error) => {
      console.log('Error decryptData user query', error);
    });

  const key = cipher.keyFromPassword(password);
  res.locals.transactions.forEach((element) => {
    element.item = cipher.decrypt(key, element.item);
  });
  if (res.locals.user) {
    // console.log('decrypting locals data');
    res.locals.user[1] = res.locals.transactions;
  }
  next();
};

module.exports = cryptoController;
