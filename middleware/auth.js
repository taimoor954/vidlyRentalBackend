//authorization
const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv').config();

module.exports = function(request, response, next){
    var token= request.header('x-auth-token');
    if(!token)
    {
        return response.status(401).send('Token not found! Not an authenticate user');
    }
    try{
        const decode = jwt.verify(token, config.get('SecretKey'));
        request.user = decode;
        next(); 
    }
    catch(e)
    {
        response.status(400).send('Authentication problem')
    }
    
}
