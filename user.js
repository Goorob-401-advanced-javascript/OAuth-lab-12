
'use strict';
const mongoose =require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let SECRET = 'afterAllThisTime';

// let db = {};
// let users = {};
const users = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true } ,

});
// hashing password  without using mongodb
// users.save = async function (record) {

//   if (!db[record.username]) {
//     record.password = await bcrypt.hashSync(record.password, 5);

//     db[record.username] = record;
//     return record;
//   }

//   return Promise.reject();
// }
// with mongodb
// eslint-disable-next-line no-use-before-define
users.pre('save', async function(){
  if (!users.username) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});
// compare  password  without using mongodb
// users.authenticateBasic = async function(user,pass) {
//   let valid = await bcrypt.compare(pass, db[user].password);
//   return valid ? db[user] : Promise.reject();
// }
// compare  password after using mongodb

users.statics.authenticateBasic = async function(username , password){
  let userName = { username };
  return this.findOne(userName)
    .then(user => user && user.comparePass(password))
    .catch(error => { throw error; });
} ;
users.methods.comparePass = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};
//  generateToken after using mongodb and having _id
users.methods.generateToken = function () {               // generate 
  let token = jwt.sign({id : this._id}, SECRET);
  return token ;
};
users.authenticateToken = async  function (token) {   // compare 
  try {
    let tokenObject = jwt.verify(token, SECRET);
        if (tokenObject.username) {
            return Promise.resolve(tokenObject.username);
        } else {
            return Promise.reject();
        }
    } catch (e) {
        return Promise.reject();
    };
  }
              

module.exports = mongoose.model('users', users);



