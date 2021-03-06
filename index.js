const mongoose = require('mongoose')
const movies = require('./routes/movies');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/movies')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Failed to connect to MongoDB: ', err))

app.use(express.json());
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));