const Joi = require('joi');
const Mongoose = require("mongoose");

const createValidation = Joi.object({
    title: Joi.string().required().min(3),
    project_id: Joi.string().min(8).required(),
    section_id: Joi.string().min(8).required(),
    description: Joi.string().min(8),
    assigned_to: Joi.string().min(8),
    due_date: Joi.date(),
    statuses: Joi.array(),
    order: Joi.number(),
    isCompleted: Joi.boolean(),
    comments: Joi.array(),
    media: Joi.array(),
    sub_tasks: Joi.array(),
})

const updateValidation = Joi.object({
    title: Joi.string().min(3),
    project_id: Joi.string().min(8),
    section_id: Joi.string().min(8),
    description: Joi.string().min(8),
    assigned_to: Joi.string().min(8),
    due_date: Joi.date(),
    statuses: Joi.array(),
    order: Joi.number(),
    isCompleted: Joi.boolean(),
    comments: Joi.array(),
    media: Joi.array(),
    sub_tasks: Joi.array(),
})

const commentValidation = Joi.object({
    comment: Joi.string().min(3),
    _id: Joi.string().min(8),
    _destroy: Joi.boolean(),
})

module.exports = {
    createValidation,
    updateValidation,
    commentValidation
}