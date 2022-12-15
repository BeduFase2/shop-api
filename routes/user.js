const express = require('express');
const router = express.Router();

const {getAll, verify} = require('../controllers/user');

router.route('/')
      .get(getAll);

router.route('/self')
      .get(verify);

module.exports = router;