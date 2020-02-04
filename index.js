'use strict' ;


const app = require('./app.js');
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/authentication';

const mongooseOptions = {
  useNewUrlParser: true ,
  useCreateIndex: true ,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose.connect( MONGODB_URI , mongooseOptions).catch(err => console.log(err));

app.start();