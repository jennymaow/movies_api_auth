const Cinema = require('../models/cinema.model');

const getAllCinemas = async (req, res, next) => {
  try {
    const allCinemas = await Cinema.find().populate('movies');
    return res.status(200).json(allCinemas);
  } catch (error) {
    return next(error);
  }
};

const deleteCinema = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findByIdAndDelete(id);
    return res.status(200).json(cinema);
  } catch (error) {
    return next(error);
  }
};

const createCinema = async (req, res, next) => {
  try {
    const cinema = new Cinema(req.body);
    const createdCinema = await cinema.save();
    return res.status(201).json(createdCinema);
  } catch (error) {
    return next(error);
  }
};

const updateCinema = async (req, res, next) => {
  try {
    const { id } = req.params;
    const modifiedCinema = new Cinema(req.body);
    modifiedCinema._id = id;
    const newCinema = await Cinema.findByIdAndUpdate(id, modifiedCinema);
    return res.status(200).json(newCinema);
  } catch (error) {
    return next(error);
  }
};

module.exports = { createCinema, getAllCinemas, deleteCinema, updateCinema };
