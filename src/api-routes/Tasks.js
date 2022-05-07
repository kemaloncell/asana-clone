const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');

const  schemas  = require('../validations/Tasks');
const express = require('express');
const {create, update, deleteTask, makeComment } = require('../controllers/Tasks');

const router = express.Router();

router.route('/').post(authenticate, validate(schemas.createValidation), create);
router.route('/:id').patch(authenticate, validate(schemas.updateValidation), update);
router.route('/:id/make-comment').post(authenticate, validate(schemas.commentValidation), makeComment);
router.route('/:id').delete(authenticate, deleteTask);


module.exports = router;