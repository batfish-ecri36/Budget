const db = require('../models/budgetModel');
const bcrypt = require("bcrypt");

const usersController = {};

usersController.getUser = async (req, res, next) => {
    // const text = `SELECT user, password, token from users where username = $1, password = $2)`;
    // const login = await db.query(text, newTransactions)
    //     .then((data) => {
    //         if (data.rows.length < 1) {
    //             return(res.redirect('/signup'))
    //         } else {
    //             return res.redirect('/main')
    //         }
    //     })
    //     .catch((error) => {
    //         console.log("Error getUser",error);
    //     });
    
    // next();
};

usersController.addUser = async (req, res, next) => {
    //const salt = await bcrypt.genSalt(10);

    // const user = {
    //     username : req.body.username,
    //     password : await bcrypt.hash(req.body.password, salt),
    //     token: 1
    // };

    // const newEncryptedUser = [];

    // for (let key in user) {
    //     newEncryptedUser.push(req.body[key]);
    // }

    // const text = `INSERT INTO users (username, password, token) VALUES ($1, $2, $3)`;
    // db.query(text, newEncryptedUser, (err, res) => {
    //     if (err) {
    //       console.log(err.stack)
    //     } else {
    //       console.log("added to users database encrypted")
    //       console.log("res")
    // }});
    
    // next();
};

module.exports = usersController;