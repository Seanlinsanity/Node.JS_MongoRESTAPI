const Joi = require('joi');
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isPublised: {
        type: Boolean,
        default: false
    }
})

const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(movie) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie
module.exports.validate = validateMovie

