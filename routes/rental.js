const {Rental, validateRental} = require('../Models/rental');
const Fawn = require('fawn'); //return class
const express = require('express');
const app = express.Router();
const mongoose = require('mongoose');
var {Customer} = require('../Models/customer');
var {Movie} = require('../Models/movie');
Fawn.init(mongoose)

app.get('/', async (request, response) => {
const rental = await Rental.find().sort({_id : 1});
return response.send(rental);
});

app.post('/', async (request, response) => {
const result = validateRental(request.body);

if(result.error)
{
    return response.status(404).send(result.error.details[0].message);
    
}
const customer_find = await Customer.findById(request.body.customerID);

if(!customer_find) 
{
    return response.status(404).send('could not find the customer');

}

const movie_find = await Movie.findById(request.body.MovieID);
if(!movie_find) 
{
 
    return response.status(404).send('could not find the movie');
}

if(movie_find.numberInStocks == 0)
{
return response.send('Out of stock');

}

var rental = new Rental({
    customer : {
        name : customer_find.Name,
        IsGold : customer_find.IsGold,
        phone : customer_find.phone
    },
    movie :  {
        title : movie_find.title,
        // id  : movie_find._id,
         dailyRentalRate : movie_find.rentalRate
    },
    rentalFee : movie_find.rentalRate
});
// await rental.save(); 

//a process called transcation will be aplied so that rental and movie both will be u
//updated at the same time. means with rental.save(), movie_find.save will be saved as well at the same time
//because some time server crash hota hai tou ek save hota hai ek nahi hota jokay acha nahi hai. In mongo we dont have 
//transaction so we use a package/library called Fawn works on process called 2 phase commit to simiulate it
try{
   await new Fawn.Task().save('RentalRate' , rental)
    .update('movies', {_id : movie_find._id}, 
    {$inc :  {numberInStocks : -1}
    })
    .run()
    response.send(rental)
}
catch(e){
response.status(500).send('Sorry! somthing failed')
}

// movie_find.numberInStocks--;
// movie_find.save();
// response.send(rental);


});

module.exports = app