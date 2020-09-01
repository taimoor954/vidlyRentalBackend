const mongoose = require('mongoose');
const Joi = require('joi');

const customer_Schema = new mongoose.Schema({
    Name : {
        type : String,
        required : true,
        maxlength : 255,
        minlength : 1,
        trim : true
    
    },
    IsGold : {
        type : Boolean,
        required : true
        
    },
    phone : {
        type : String,
        required : true,
        maxlength : 100,
        minlength : 0,
        trim : true
    
    }
});
var Customer = mongoose.model('Customer', customer_Schema);

const validateCustomer = (customer) => {
     const schema = Joi.object({
        
            Name :  Joi.string().required().min(1).max(255),
            IsGold :  Joi.boolean().required(),
            phone :  Joi.string().required().min(11).max(11),
        
        
     })
    // console.log(schema.validate);
    return schema.validate(customer)
}
exports.Customer = Customer;
exports.validateCustomer = validateCustomer;