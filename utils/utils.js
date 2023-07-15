const regExUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const allowedCors = [
  'https://mj669.movies-explorer.nomoredomains.xyz',
  'http://mj669.movies-explorer.nomoredomains.xyz',
  'https://api.mj669.movies-explorer.nomoredomains.rocks',
  'http://api.mj669.movies-explorer.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
];

module.exports = {
  regExUrl,
  allowedCors,
};
