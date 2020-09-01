const mongoose = require('mongoose');
const Joi = require('Joi');
const PasswordComplexity  = require('joi-password-complexity'); //return class
const bcrypt =require('bcrypt'); 
const jwt = require('jsonwebtoken');
// const {name , secretKey} = require('../index')
// const myPrivateKey = secretKey;


const config = require("config");
require('dotenv').config();

// console.log(name, 'Inside Register Model');
// console.log(secretKey, 'Inside Register Model');
// console.log(process.env.VIDLY_PRIVATE_KEY, 'using pev');

const { has } = require('lodash');


// console.log(secretKey, 'inside register model');

// const secretKey = require('../index');

// var run = async () => {



//     console.log(result);
//   console.log(hash); //salt is included in pass because decrypt wants to know the orignal salt that was use 
//   //to hash this password

// }
// run();


 //a salt is bascially a random string that is added before and after the password
//this gensalt is async
//gensalt take number of round as a parameter default value is 10
//

const register_schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 50,
        minlength : 5
    },
     email : {
        type : String,
        required : true,
        unique : true,
       
     },
     password : {
        type : String,
        required : true,
        maxlength : 120,
        minlength :5
     },
     isAdmin : {
         type : Boolean
     }
});


register_schema.methods.getAuthToken = function () {
    const token = jwt.sign({_id : this._id, isAdmin : this.isAdmin}, process.env.VIDLY_PRIVATE_KEY); //dont store private key in source. Save them in Env variablr
    return token;
}
const Register = mongoose.model('RegisterUser', register_schema);
const validateRegisterUser = (registerUser) => {
const schema = Joi.object({
    name : Joi.string().max(50).min(5).required(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password : Joi.string().max(120).min(5).required(),

})
return schema.validate(registerUser);
};

exports.validateRegisterUser  = validateRegisterUser;
exports.Register = Register;
exports.myPrivateKey = process.env.VIDLY_PRIVATE_KEY;