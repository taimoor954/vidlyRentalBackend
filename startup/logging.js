require('winston-mongodb'); //dont care what is exported. use it to log err message in mongodb 
const winston = require('winston');
require('express-async-errors'); //use to handle  async route handler errrors 

module.exports = function()
{
    winston.add(new winston.transports.File({filename : 'logfile.log'})) //here we are config winston to create a file called logfile.log and store all the errors init
    winston.add(new winston.transports.MongoDB({db : "mongodb://localhost/Rental-Movies"})) //here we are config winston to create a file called log in mongodb and store all the errors init

    
process.on('uncaughtException', (err) => {
    // console.log('Uncaught exception occurs'); //uncaughtEx means firing an error when sth outside of express occurs like server not working or not connected to database 
    winston.error(err.message, err) //use to log exception in log file

    })  //process obj is event emitter that publish event. on is use to subscribe the event


winston.exceptions.handle(
    
    new winston.transports.File({filename : 'uncaughtException.log'}),
    new winston.transports.Console({colorize : true, prettyPrint : true})

    )


process.on('unhandledRejection', (err) => { //unhandledRej means rejectin a promise
throw err
})  //process obj is event emitter that publish event. on is use to subscribe the event


}