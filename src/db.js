const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'postgres',
  password: 'unsafe_pass',
  port: 5432
})

pool.on('connect', () => {
  console.log('DB Connection stablished');
});


const createFilmTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      films(
        id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        director VARCHAR(128) NOT NULL,
        genre VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const dropFilmTable = () => {
  const queryText = 'DROP TABLE IF EXISTS films';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createFilmTable,
  dropFilmTable
};

require('make-runnable');
