const mongoose = require('mongoose');
const express = require('express');
const {Genre , genre_Schema , validateGenre} = require('../Models/genre');
const { request, response } = require('express');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const validateGenremiddleware = require('../middleware/genreValidate');
const app = express.Router();

app.get('/', async (request , response) => {
  
  // throw new Error('Could not get the genres')
  
  var result = await Genre.find().sort({name : 1}).
  select({name : 1});
  response.send(result);

});

app.get('/:id', validateGenremiddleware ,async (request, response) => {
 
  const genre = await Genre.findById(request.params.id);
  if(!genre)
  {
   return  response.status(404).send('Sorry! Genre not found');
  }
 return response.send(genre); 
})




app.post('/', authMiddleware , async (request, response) => {
 var result = validateGenre(request.body);
 if(result.error)
 {
    return response.status(400).send(result.error.details[0].message);
}   
var genre = new Genre({
    name : request.body.name
});
await genre.save();

return response.send(genre);
});

app.delete('/:id',[authMiddleware , adminMiddleware], async (request, response ) => {
    const genredeleted  = await Genre.findByIdAndRemove(request.params.id);
    if(!genredeleted)
    {
      return  response.status(404).send('Genre Not found');
  }
   return response.send(genredeleted);
})


module.exports = app
