const { insert, list, loginUser } = require('../services/Users');
const httpStatus = require('http-status');
const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper');

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insert(req.body)
      .then(result => {
      res.status(httpStatus.CREATED).send(result)
  }).catch(err => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  });

 };

const login = (req,res) => {
    loginUser(req.body)
        .then(user => {
            if(!user) return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kullanıcı bulunamadı'});

            user = {
                ...user.toObject(),
                tokens:{
                   access_token : generateAccessToken(user),
                   refresh_token: generateRefreshToken(user)
                }
            }
            delete user.password;
            res.status(httpStatus.OK).send(user)
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
}

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
    index,
    login
 };