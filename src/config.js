module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || '8f119b9f-8693-4a27-934e-60d4bc4c1905',
  DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/bookmarks',
}