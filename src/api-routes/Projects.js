// validations
// validate middleware
const express = require('express');
const { create, index } = require('../controllers/Projects');
const router = express.Router();

router.post('/', index);
router.get('/', create);


module.exports = {
  router,
};