const { insert, list } = require('../services/Users');
const httpStatus = require('http-status');
const { passwordToHash } = require('../scripts/utils/helper');

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insert(req.body)
      .then(result => {
      res.status(httpStatus.CREATED).send(result)
  }).catch(err => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  });

 };

const index = (req, res) => {
    list()
      .then(result => {
      res.status(httpStatus.OK).send(result)
  }).catch(err => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  });
 };

module.exports = {
    create,
    index
 };