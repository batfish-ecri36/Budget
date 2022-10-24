const db = require('../models/budgetModel');
const cipher = require('../models/cipher')
const update = async () => {
    let admin = [1];
  let password;
  const userquery = `SELECT password from users where _id = $1`;
  await db.query(userquery, admin)
    .then((data) => {
      password = data.rows[0]['password'];
    })
    .catch((error) => {
      console.log("Error encryptData user query",error);
    })
    const key = cipher.keyFromPassword(password);


    let plaintext;
    user = [1]
    const text =`SELECT * FROM encrypted_transactions WHERE user_id=$1;`
    const result = await db.query(text, user)
        .then((data) => {
            plaintext = data.rows;
        })  
        .catch((error) => {
            console.log("Error select query",error);
        })


    plaintext.forEach((element, i) => {
        setTimeout(() => {
            element.item = cipher.encrypt(key, element.item);
            let param = [element._id, element.item];
            let updatequery = `UPDATE encrypted_transactions set item=$2 where _id=$1`
            db.query(updatequery, param)
                .catch((error) => {
                console.log("Error encryptData user query",error);
            })
        }, i * 1000)
    })

}

update();