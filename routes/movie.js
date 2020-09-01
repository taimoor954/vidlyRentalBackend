const mongoose = require('mongoose');
const express = require('express');
const {validateFunctionForMovies , Movie , movie_Schema } = require('../Models/movie');
const { request } = require('express');
const { Genre } = require('../Models/genre');
const app = express.Router();

app.get('/', async (request , response) => {
    var result = await Movie.find().sort({title : 1}).
    select({title : 1, genre : 1 , numberInStocks : 1 , rentalRate : 1 });
    
    response.send(result);
});

app.post('/', async (request, response) => {
 var result = validateFunctionForMovies(request.body);
 if(result.error)
 {
    return response.status(404).send(result.error.details[0].message);
 }   
 var genre = await Genre.findById(request.body.genreId);
 if(!genre)
 {
     return response.status(404).send('Genre not found')
 }


 var movie = new Movie({
     title : request.body.title,
     genre :{
        _id : genre._id,
        name : genre.name
        },
     numberInStocks : request.body.numberInStocks,
     rentalRate : request.body.rentalRate
 
    })
await movie.save();
return response.send(movie);

});


module.exports = app
