// validations
// validate middleware
const express = require('express');
const { create } = require('../controllers/Projects');
const router = express.Router();

router.get('/', create);

module.exports = {
  router,
};