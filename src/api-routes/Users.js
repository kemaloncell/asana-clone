
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const  schemas  = require('../validations/Users');
const express = require('express');
const { create, index, login, projectList, resetPassword } = require('../controllers/Users');

const router = express.Router();

router.get('/', index);
router.route('/').post(validate(schemas.createValidation), create);
router.route('/login').post(validate(schemas.loginValidation), login);
router.route('/projects').get(authenticate, projectList);
router.route('/reset-password').post(validate(schemas.resetPasswordValidation),resetPassword);

module.exports = router;