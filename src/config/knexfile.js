module.exports = {
  client: 'sqlite3',
  connection: {
    filename: '../database/database.sqlite',
  },
  migrations: {
    directory: '../database/migrations',
  },
  seeds: {
    directory: '../database/seeds',
  },
  useNullAsDefault: true,
};
