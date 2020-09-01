const {validateRegisterUser , Register} = require('../Models/Register');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt =require('bcrypt'); 
const authMiddleware = require('../middleware/auth');
const _ = require('lodash');

const app = express.Router();


app.get('/', async (request, response) => {
  const result =  await Register.find().sort({name : 1}).select({name : 1, email : 1, password : 1});
  return response.send(result)
});

app.get('/me', authMiddleware , async (request , response) => {
const user =  await Register.findById(request.user._id)
return response.send(user)
})





app.post('/', async (request, response) => {
  try{
    const result = validateRegisterUser(request.body);
    if(result.error)
    {
     return response.status(404).send(result.error.details[0].message);
    
    }


     const register = new Register(_.pick(request.body, ['name' , 'email', 'password'])); 
     const salt = await bcrypt.genSalt(10);
     register.password = await bcrypt.hash(register.password, salt);
     await register.save()
     const token = register.getAuthToken(); //dont store private key in source. Save them in Env variablr //1st varible take 
     // payload next arg takes  private key
      response.header('x-auth-token', token).send( _.pick(register, ['name', 'email', '_id']));

    
    }
catch(err)
{
response.send(err.message)
}
  
});

module.exports = app;