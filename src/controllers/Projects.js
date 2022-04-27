const { insert } = require('../services/Projects');
const httpStatus = require('http-status');
const create = (req, res) => {

  insert({name:"test projesi2"})
      .then(result => {
      res.status(httpStatus.CREATED).send(result)
  }).catch(err => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  });

 };

const index = (req, res) => {
  res.status(200).send("project index")
 };

module.exports = {
    create,
    index
 };