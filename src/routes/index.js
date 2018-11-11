const express = require('express');
const router = express.Router();
const db = require('../controllers/Film');

const v1Endpoint = '/api/v1/films';
const v1EndpointId = v1Endpoint + '/:id';

router.get(v1Endpoint, db.getFilms);
router.get(v1EndpointId, db.getFilm);
router.post(v1Endpoint, db.createFilm);
router.put(v1EndpointId, db.updateFilm);
router.delete(v1EndpointId, db.deleteFilm);

router.get('/', (req, res) => {
  res.render('index', {title: 'Silly simple Films API'});
});

module.exports = router;
