const express = require('express');
const app = express.Router();
const Joi = require('joi');

const {Customer, validateCustomer} = require('../Models/customer')


app.get('/', async (request, response) => {
const customers  = await Customer.find().sort({name : 1}).
select({Name : 1 , IsGold : 1, phone : 1})
response.send(customers)
});

app.post('/', async (request, response) => {
    // console.log('INSIDE POST');
    const result = validateCustomer(request.body);
  if(result.error)
  {

    return response.status(404).send(result.error.details[0].message)
  
}
    var customer = new Customer({
        Name  : request.body.Name,
        IsGold : request.body.IsGold,
        phone : request.body.phone
    });
await customer.save();
return response.send(customer);
});



app.put('/:id',async (request, response) => {
    
try {
    
    var result  =  validateCustomer(request.body);
    
    if(result.error)
    {
        console.log('insider');
    
        return response.status(404).send(result.error.details[0].message);
    }
    
    var find_customer = await Customer.findByIdAndUpdate(request.params.id, 
        {
            Name : request.body.Name,
            IsGold : request.body.IsGold,
            phone : request.body.phone,  
        }, 
        {
            new : true
        }
    );
   
    if(!find_customer) return response.status(404).send('Customer not found!');
    return response.send(find_customer)
}

catch(e)
{
        response.send(e.message)
}


})
    





module.exports = app