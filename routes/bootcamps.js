const express = require('express');
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  modifyBootcamp,
  deleteBootcamp
} = require('../controllers/bootcamps');

router.route('/').get(getBootcamps);

router.route('/:id').get(getBootcamp);

router.route('/').post(createBootcamp);

router.route('/:id').put(modifyBootcamp);

router.route('/:id').delete(deleteBootcamp);

module.exports = router;
