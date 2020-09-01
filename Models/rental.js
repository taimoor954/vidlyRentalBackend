const mongoose = require('mongoose');
const Joi = require('joi');

const rental_schema = new mongoose.Schema({
customer : {
    type :  new mongoose.Schema({
        name : {
            type : String,
            required : true,
            maxlength : 255,
            minlength : 2,
            trim :true
        },
        IsGold : {
            type : Boolean,
            required : true,
        },
        phone : {
            type : String,
            maxlength : 18,
            minlength : 1,
        }
    }),
    required : true
},
movie : {
    type : new mongoose.Schema({
        title  : {
            type : String,
            maxlength : 100,
            minlength : 1,
        },
        dailyRentalRate : {
            type : Number,
            required : true,
            min : 0,
            max : 1000,
        }  
    }),
    required : true
},
dateOut : {
    type : Date,
    required : true,
    default : Date.now
},
dateReturned : {
type : Date
},
rentalFee : {
    type : Number,
    min : 0
}
});

const Rental = mongoose.model('RentalRate' , rental_schema);

var validateRental =  (rental) => {
 const schema =  Joi.object({
    // rentalFee  : Joi.number().required(), 
 
    MovieID : Joi.objectId().required(),
    customerID : Joi.objectId().required(),

})

return schema.validate(rental);

}

exports.validateRental = validateRental;
exports.rental_schema = rental_schema;
exports.Rental = Rental;