module.exports = {
  SuperSecret: process.env.NODE_ENV !== 'production' ? 'verySecret' : process.env.JWT_SECRET,
};
