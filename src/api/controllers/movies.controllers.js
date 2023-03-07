const Movie = require('../models/movie.model');

const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllMovies = async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);

    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = new Movie({
      ...req.body,
      poster: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dnb4ujbgr/image/upload/v1678111620/Movies_auth/elementor-placeholder-image_u2kzkz.webp',
    });
    const createdMovie = await movie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    return next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newMovie = new Movie(req.body);
    newMovie._id = id;

    //Primero borramos la imagen original
    const originalMovie = await Movie.findById(id);
    if (req.file) {
      deleteImgCloudinary(originalMovie.poster);
      newMovie.poster = req.file.path;
    }
    await Movie.findByIdAndUpdate(id, newMovie);

    return res.status(200).json(newMovie);
  } catch (error) {
    return next('Failing updating movie', error);
  }
};

module.exports = { createMovie, getAllMovies, deleteMovie, updateMovie };
