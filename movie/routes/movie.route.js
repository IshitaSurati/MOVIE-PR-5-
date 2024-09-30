const express = require('express');
const { createMovie, updateMovie, deleteMovie, addRating, addComment, filterMovies } = require('../controllers/movie.controller');
const router = express.Router();

router.post('/create', createMovie);
router.patch('/update/:id', updateMovie);
router.delete('/delete/:id', deleteMovie);
router.patch('/rating/:id', addRating);
router.patch('/comment/:id', addComment);
router.get('/filter', filterMovies);

module.exports = router;
