const mongoose = require('mongoose');
const Joi = require('Joi');
const {genre_Schema , Genre} = require('./genre');

// const getConnection = async () => {
//     mongoose.set('useNewUrlParser', true);
//     mongoose.set('useUnifiedTopology', true);

//     await mongoose.connect('mongodb://localhost/Rental-Movies');
//     console.log('Connected');
// }

// getConnection();


const movie_Schema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxlength : 255,
        minlength : 2,
        trim : true,
    },
    genre : {
        type : genre_Schema,
        required : true,
    },
    numberInStocks : {
        type : Number,
        required : true,
        max : 10000,
        min  : 0 

    },
    rentalRate : {
        type : Number,
        required : true,
        max : 10000,
        min  : 0 

    }
    
});


const Movie = mongoose.model('Movies' , movie_Schema);

var createMovie = async (Mygenre) =>{
    var movie = new Movie({
        title : 'Five Feet apart',
        genre : Mygenre,
        numberInStocks : 100,
        rentalRate : 50
        // isGold : true,
        // phone : '03492477842' 
    
    });
    await movie.save()
    console.log('Saved!!!');
    }

//     createMovie(new Genre({
//     name : 'Romance'
// }));



const validateFunctionForMovies = (Movies) => {
const schema = Joi.object({
    title : Joi.string().required().max(500).min(1),
    genreId : Joi.objectid().required(),
    rentalRate : Joi.number().required().max(1000).min(0),
    numberInStocks : Joi.number().required().max(1000).min(0)

})
return schema.validate(Movies);
};

exports.validateFunctionForMovies = validateFunctionForMovies;
exports.Movie =Movie;
exports.movie_Schema = movie_Schema