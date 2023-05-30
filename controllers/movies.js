const Movie = require('../models/movie');
const errors = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner', 'likes'])
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: _id,
  })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(
          new errors.ValidationError('Переданы некорректные данные'),
        );
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.deleteOne({ _id: movieId })
    .then((movie) => {
      if (movie.deletedCount === 0) {
        throw new errors.NotFoundError('Фильм не найден');
      }
      return res.send({ message: 'Фильм удален' });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
