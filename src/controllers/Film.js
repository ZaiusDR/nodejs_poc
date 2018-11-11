const moment = require('moment');
const promise = require('bluebird');

var options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:unsafe_pass@postgres:5432/postgres'
const db = pgp(connectionString);


function createFilm(req, res, next) {
  const text = `INSERT INTO
    films(title, director, genre, created_date, modified_date)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
  const values = [
    req.body.title,
    req.body.director,
    req.body.genre,
    moment(new Date()),
    moment(new Date())
  ];

  db.one(text, values)
    .then((data) => {
      res.json(data, 201);
    })
    .catch(err => {
      return next(err);
    });
}


function getFilms(req, res, next) {
  const findAllQuery = 'SELECT * FROM films';

  db.any(findAllQuery)
    .then((data) => {
      res.json(data, 200);
    })
    .catch((err) => {
      return next(err);
    })
}

function getFilm(req, res, next) {
  const text = 'SELECT * FROM films WHERE id = $1';

  db.any(text, [req.params.id])
    .then((data) => {
      if (!data[0]) {
        res.json({'message': 'Film not found'}, 404)
        return;
      };
      res.json(data, 200);
    })
    .catch((err) => {
        return next(err);
    })
}

function updateFilm(req, res, next) {
  const findOneQuery = 'SELECT * FROM films WHERE id=$1';
  const updateOneQuery =`UPDATE films
    SET title=$1,director=$2,genre=$3,modified_date=$4
    WHERE id=$5 returning *`;

  db.any(findOneQuery, [req.params.id])
    .then((data) => {
      if(!data[0]) {
        res.json({'message': 'Film not found'}, 404);
        return;
      }
      const values = [
        req.body.title || rows[0].title,
        req.body.director || rows[0].director,
        req.body.genre || rows[0].genre,
        moment(new Date()),
        req.params.id
      ];
      db.any(updateOneQuery, values)
        .then((data) => {
          res.json(data, 200)
        })
      .catch((err) => {
        return next(err);
      });
    })
}

function deleteFilm(req, res, next) {
  const deleteQuery = 'DELETE FROM films WHERE id=$1 returning *';

  db.any(deleteQuery, [req.params.id])
    .then((data) => {
      if(!data[0]) {
        res.json({'message': 'Film not found'}, 404);
        return;
      }
      res.json({'message': 'deleted'}, 204);
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  createFilm: createFilm,
  getFilms: getFilms,
  getFilm: getFilm,
  updateFilm: updateFilm,
  deleteFilm: deleteFilm,
};
