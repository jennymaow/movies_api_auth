const express = require('express');

const {
  createCinema,
  getAllCinemas,
  deleteCinema,
  updateCinema,
} = require('../controllers/cinemas.controllers');

const CinemasRoutes = express.Router();

CinemasRoutes.get('/', getAllCinemas);
CinemasRoutes.post('/', createCinema);
CinemasRoutes.delete('/:id', deleteCinema);
CinemasRoutes.put('/:id', updateCinema);

module.exports = CinemasRoutes;
