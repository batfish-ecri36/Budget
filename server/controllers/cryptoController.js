const db = require('../models/budgetModel');
const cipher = require('../models/cipher')

const cryptoController = {};

cryptoController.encryptData = async (req, res, next) => {
    console.log('cryptoController.encryptData');
  const user = [req.body.user_id];
  let password;
  console.log('user:', user);
  const text = `SELECT password from users where _id = $1`;
  await db.query(text, user)
    .then((data) => {
      password = data.rows[0]['password'];
    })
    .catch((error) => {
      console.log("Error encryptData user query",error);
    })
  console.log('queried password: ', password)
  const key = cipher.keyFromPassword(password);
  console.log('key: ',key);
  console.log('item: ', req.body.item);
  req.body.item = cipher.encrypt(key, req.body.item);
  console.log('encrypted item: ', req.body.item);

  
  next();
};

cryptoController.decryptData = async (req, res, next) => {
    console.log('cryptoController.decryptData');
  const user = [req.body.user_id];
  let password;
  console.log('user:', user);
  const text = `SELECT password from users where _id = $1`;
  await db.query(text, user)
    .then((data) => {
      password = data.rows[0]['password'];
    })
    .catch((error) => {
      console.log("Error decryptData user query",error);
    })
  console.log('queried password: ', password)
  const key = cipher.keyFromPassword(password);
  console.log('key: ',key);
  console.log('encrypted item: ', res.locals.transactions);
  res.locals.transactions.forEach(element => 
    element.item = cipher.decrypt(key, element.item));
  console.log('decrypted item: ', res.locals.transactions);

  
  next();
};

module.exports = cryptoController;