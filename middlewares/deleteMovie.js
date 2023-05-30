const Movie = require('../models/movie');
const validationError = require('../errors');

module.exports = (req, res, next) => {
  Movie.findById({ _id: req.params.movieId })
    .then((movie) => {
      if (!movie) {
        return next(
          new validationError.NotFoundError('Фильм с указанным id не существует'),
        );
      }
      if (movie.owner.toHexString() !== req.user._id) {
        return next(
          new validationError.ForbiddenError('У вас нет прав на удаление чужой фильма'),
        );
      }
      return next();
    })
    .catch(next);
};
