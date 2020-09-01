const mongoose = require('mongoose');
const Joi = require('Joi');
const genre_Schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 200,
        minlength : 5
    }
});

const Genre = mongoose.model('Genre', genre_Schema);
const validateGenre = (genre) => {
var schema = Joi.object({
    name : Joi.string().required().max(200).min(5)
    });
return schema.validate(genre);

}


exports.genre_Schema = genre_Schema;
exports.Genre = Genre;
exports.validateGenre = validateGenre;