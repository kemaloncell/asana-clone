const Joi = require('joi');

const createValidation = Joi.object({
    title: Joi.string().required().min(3),
    project_id: Joi.string().min(8).required(),
    section_id: Joi.string().min(8).required(),
})

const updateValidation = Joi.object({
    title: Joi.string().min(3),
    due_date: Joi.date(),

})

module.exports = {
    createValidation,
    updateValidation
}