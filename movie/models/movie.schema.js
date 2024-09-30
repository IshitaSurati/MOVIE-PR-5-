const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  category: { type: String, required: true },
  actors: [{ name: String }],
  image: String,
  ratings: [
    {
      value: { type: Number, min: 0, max: 10 },
    },
  ],
  comments: [
    {
      text: String,
    },
  ],
  addedBy: String,
});

module.exports = mongoose.model('Movie', movieSchema);
