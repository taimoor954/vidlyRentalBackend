const mongoose = require('mongoose');
const express = require('express');

require('winston-mongodb'); 
const winston = require('winston');
require('dotenv').config()
const config = require('config')


const secretKey = config.get('SecretKey');
const name = config.get('name');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/config')();
require('./startup/Joi')();
require('./startup/prod')(app);

const server= app.listen(3000 , () => {
    winston.info('Listening at 3000 ');
})

module.exports = server;
