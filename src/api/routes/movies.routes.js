const express = require('express');
const { isAuth } = require('../../middlewares/auth.middleware');
const {
  createMovie,
  getAllMovies,
  deleteMovie,
  updateMovie,
} = require('../controllers/movies.controllers');

const { upload } = require('../../middlewares/files.middleware');

const MoviesRoutes = express.Router();

MoviesRoutes.get('/', [isAuth], getAllMovies);
MoviesRoutes.delete('/:id', deleteMovie);
MoviesRoutes.patch('/:id', upload.single('poster'), updateMovie);
MoviesRoutes.post('/', upload.single('poster'), createMovie);

module.exports = MoviesRoutes;
