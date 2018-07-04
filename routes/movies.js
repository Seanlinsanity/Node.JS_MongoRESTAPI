const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie')

router.get('/', async (req, res) => {
  try{
    const moives = await Movie.find().sort('name')
    res.send(moives);
  }catch (err){
    res.status(404).send('Failed to get movie in MongoDB.')
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({ name: req.body.name })
  try{
    movie = await movie.save()
    res.send(movie);

  }catch (err){
    res.status(404).send('Failed to save movie in MongoDB.')
  }
});

router.put('/:id', async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  try{
    const movie = await Movie.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, {
      new: true
    })
    res.send(movie);

  }catch (err){
    return res.status(404).send('The movie with the given ID was not found.');
  }

});

router.delete('/:id', async (req, res) => {

  try{
    const movie = await Movie.findOneAndRemove({ _id: req.params.id })
    res.send(movie);

  }catch (err){
    return res.status(404).send('The movie with the given ID was not found.');
  }
});

router.get('/:id', async (req, res) => {
  try{
    const movie = await Movie.findOne({ _id: req.params.id })
    res.send(movie);

  }catch (err){
    return res.status(404).send('The movie with the given ID was not found.')
  }

});

module.exports = router;