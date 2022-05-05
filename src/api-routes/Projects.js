const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');

const  schemas  = require('../validations/Projects');
const express = require('express');
const { create, index, update, deleteProject } = require('../controllers/Projects');
const router = express.Router();

// authenticate'yi geçerse indexe gider yani token kontrolü
router.route('/').get(authenticate, index);
// ilk baş authenticate yapıyoruz daha sonra validasyon yapıyoruz
router.route('/').post(authenticate, validate(schemas.createValidation), create);
router.route('/:id').patch(authenticate, validate(schemas.updateValidation), update);
router.route('/:id').delete(authenticate, deleteProject);


module.exports = router;