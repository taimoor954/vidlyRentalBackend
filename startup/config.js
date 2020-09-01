const config = require('config');
const secretKey = require('../index');
// console.log(config.get('SecretKey'), 'get secret from config js');

module.exports =function()
{

    if(!config.get('SecretKey'))
    {
        throw new Error('Fatal error : Secret key is not defined')
        //can also use throw '' but it doesnt help in stack trace so instead of throw string, better to throw error object
        // process.exit(1); //ager env var access karnay may koi bhi issue ata hai tou process.exit(any number other than 0) will stop the process
    }
}
