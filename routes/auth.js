//authentication
const express = require('express');
const app = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { request, response } = require('express');
const {Register}  =require('../Models/Register'); 

require('dotenv').config();


app.post('/', async (request, response) => {
const result = validateAuthentication(request.body);
if(result.error)
{
   return response.status(400).send(`Couldn't validate`);
}
const user = await Register.findOne({email : request.body.email});
if(!user)
{
    return response.status(404).send('Problem in id or password');
}
const passcheck = await bcrypt.compare(request.body.password, user.password); //use salt to dcrypt request.body.compare then compare with user.password
if(!passcheck)
{
    return response.status(404).send('Problem in id or password');
}

const token = user.getAuthToken(); //dont store private key in source. Save them in Env variablr
  
//MyPRivatekey is just a sample

    //iat is just time which tells when this jwt is created
return response.send(token);

});

var validateAuthentication = (authentication) => {
    const schema = Joi.object({
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password : Joi.string().max(120).min(5).required(),
   });
   return schema.validate(authentication)
}

module.exports = app;