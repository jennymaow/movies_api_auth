const mongoose = require('mongoose');

const CinemaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
  },
  {
    tymestamps: true,
  },
);

const Cinema = mongoose.model('Cinema', CinemaSchema);

module.exports = Cinema;
