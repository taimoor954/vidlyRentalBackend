const winston = require('winston'); //use to log errors returns objectr

module.exports = function(err, request, response, next)
{

    // winston.log('errors', err.message)
    winston.error(err.message, err); //used .error to print an error err.message is the msg we get from 
    //throw new error on genre route whereas second parameter add meta data ie error object


    //following are some message levels use in wisnton.log
    //error
    //warn
    //info
    //verbose
    //debug
    //silly
    response.status(500).send('Something failed Internally')

}