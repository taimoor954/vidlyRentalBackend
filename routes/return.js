const express = require('express');
const Joi = require('joi')
const app = express.Router();
const {Rental} = require('../Models/rental'); 
const {Movie} = require('../Models/movie'); 
const authMiddleware = require('../middleware/auth')
const moment =require('moment');



app.post('/',authMiddleware, async (request , response) => {
   const result = validateReturn(request.body);
   if(result.error)
   {
    return response.status(500).send(error.details[0].message) //500 return hoga kyu kay validation error
    //aiega 
   
   }
  
   // if(!request.body.customerID) 
   //  {
   //    response.status(400).send('customer id is not found')
   
   // }
   // if(!request.body.movieID) 
   //  {
   //    response.status(400).send('movie id is not found')
   // }
   
   const rental = await Rental.findOne({
      'customer._id' : request.body.customerID,
      'movie._id' : request.body.movieID,
   })
   if(!rental)
   {
      return response.status(404).send('No rental found with this id')
   }
   if(rental.dateReturned)
   {
      return response.status(400).send('Return already processed')
   }
      // i just definded datereturned here with a number 
   rental.dateReturned = new Date();
   const rentalDays = moment().diff(rental.dateOut, 'days');
   rental.rentalFee = rentalDays * rental.movie.dailyRentalRate 
   await rental.save();
   
   await Movie.update({_id : rental.movie._id},{
    $inc :   {numberInStocks : 1}
      
   })


   return response.status(200).send(rental)
   // return response.status(401).send('Client logged in')  //sent this to auth model, aese kara tou 200 per cheez return hojayegi and next statment check nahi hogi
   //this is not the actual code, but this is the simplest that could passa the test in return.js
});

var validateReturn = (Return) => {
   const schema = Joi.object({
      movieID : Joi.objectid().required(),
      customerID : Joi.objectid().required(),
  
      });
  return schema.validate(Return)
}



  module.exports = app;