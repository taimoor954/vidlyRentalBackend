const winston = require('winston');
const mongoose = require('mongoose');

const config  = require('config');
// const db = require('../index');

const db= config.get('db');
module.exports = async function()
{
  
    mongoose.set('useFindAndModify', false)
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);

    
    await mongoose.connect(db);
  
    winston.info(`Connected to db ${db}`)
 
    console.log(`Connected to ${db}`);

}