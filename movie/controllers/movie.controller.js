const Movie = require('../models/movie.schema');

const createMovie = async (req, res) => {
  const { title, description, releaseDate, category, actors, image, addedBy } = req.body;
  if (!title || !description || !releaseDate || !category || !addedBy) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const movie = new Movie({ title, description, releaseDate, category, actors, image, addedBy });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addRating = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  if (value < 0 || value > 10) {
    return res.status(400).json({ error: 'Rating must be between 0 and 10' });
  }
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    movie.ratings.push({ value });
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Comment text is required' });
  }
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    movie.comments.push({ text });
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filterMovies = async (req, res) => {
  const { title, addedBy, releaseDate, category } = req.query;
  try {
    const query = {};
    if (title) query.title = title;
    if (addedBy) query.addedBy = addedBy;
    if (releaseDate) query.releaseDate = releaseDate;
    if (category) query.category = category;
    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createMovie, updateMovie, deleteMovie, addRating, addComment, filterMovies };
