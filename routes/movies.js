const moviesRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const authDelete = require('../middlewares/deleteMovie');
const { movieValidate, deleteMovieValidate } = require('../middlewares/validation');

moviesRouter.get('/', getMovies);

moviesRouter.post(
  '/',
  movieValidate,
  createMovie,
);

moviesRouter.delete(
  '/:movieId',
  deleteMovieValidate,
  authDelete,
  deleteMovie,
);

module.exports = moviesRouter;
