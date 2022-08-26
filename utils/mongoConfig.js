const mongoUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  mongoUrl,
};
